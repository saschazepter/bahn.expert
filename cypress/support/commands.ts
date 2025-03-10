import { parse, stringify } from '@/devalue';
import '@testing-library/cypress/add-commands';
import type { AppRouter } from '@/server/rpc';
import {
	type AnyProcedure,
	type AnyRouter,
	type DeepPartial,
	type RouterRecord,
	TRPCError,
	TRPC_ERROR_CODES_BY_KEY,
	type TRPC_ERROR_CODE_KEY,
	createFlatProxy,
	createRecursiveProxy,
	type inferProcedureInput,
	type inferProcedureOutput,
} from '@trpc/server/unstable-core-do-not-import';
import type {
	RouteMatcherOptions,
	RouteMatcherOptionsGeneric,
	StaticResponseWithOptions,
	// no Idea why we need to import with node_modules here
} from '../../node_modules/cypress/types/net-stubbing';

declare global {
	namespace Cypress {
		interface Chainable<Subject = any> {
			trpc: TRPCStub<AppRouter>;
		}
	}
}

type CyHandlerWithInput = StaticResponseWithOptions &
	Pick<RouteMatcherOptionsGeneric<unknown>, 'times'>;

type TRPCStub<
	TRouter extends AnyRouter,
	TRecord = TRouter['_def']['record'],
> = {
	[TKey in keyof TRecord]: TRecord[TKey] extends infer $Value
		? $Value extends RouterRecord
			? TRPCStub<TRouter, $Value>
			: $Value extends AnyProcedure
				? (
						input: Partial<inferProcedureInput<$Value>>,
						handlerOptions: Omit<CyHandlerWithInput, 'body'> & {
							body?: DeepPartial<inferProcedureOutput<$Value>>;
						},
					) => Cypress.Chainable
				: never
		: never;
};

const TRPC_ERROR_CODES_BY_HTTP: Record<number, TRPC_ERROR_CODE_KEY> = {
	[404]: 'NOT_FOUND',
};

const trpcStub = createFlatProxy<TRPCStub<AppRouter>>((key) =>
	createRecursiveProxy((opts) => {
		const fullPath = [key, ...opts.path];
		const pathname = `/rpc/${fullPath.join('.')}`;
		const inputParameter = opts.args[0] as any;
		const { times, ...cyHandler } = opts.args[1] as CyHandlerWithInput;

		const intercept = (resolvedOpts: typeof cyHandler) => {
			const interceptOptions: RouteMatcherOptions = {
				pathname,
			};
			if (times != null) {
				interceptOptions.times = times;
			}
			return cy.intercept(interceptOptions, (req) => {
				const trpcInput = parse(JSON.parse(req.query.input as string));
				if (typeof inputParameter === 'object') {
					for (const queryKey of Object.keys(inputParameter)) {
						if (
							JSON.stringify(trpcInput[queryKey]) !==
							JSON.stringify(inputParameter[queryKey])
						) {
							return;
						}
					}
				} else if (typeof inputParameter === 'string') {
					if (trpcInput !== inputParameter) {
						return;
					}
				} else {
					return;
				}
				req.reply(resolvedOpts);
			});
		};

		if (cyHandler.statusCode && cyHandler.statusCode !== 200) {
			const error = new TRPCError({
				code: TRPC_ERROR_CODES_BY_HTTP[cyHandler.statusCode],
			});
			cyHandler.body = {
				error: stringify({
					message: error.message,
					code: TRPC_ERROR_CODES_BY_KEY[error.code],
					data: {
						code: error.code,
						httpStatus: cyHandler.statusCode,
					},
				}),
			};
		} else if (cyHandler.body) {
			cyHandler.body = {
				result: {
					data: stringify(dateReviver(cyHandler.body)),
				},
			};
		}

		if (cyHandler.fixture) {
			return cy.fixture(cyHandler.fixture).then((f) => {
				delete cyHandler.fixture;
				const parsedJson = dateReviver(f);
				if (parsedJson?.result?.data) {
					cyHandler.body = parsedJson;
				} else {
					cyHandler.body = {
						result: {
							data: stringify(parsedJson),
						},
					};
				}

				cyHandler.body = {
					result: {
						data: stringify(dateReviver(f)),
					},
				};
				return intercept(cyHandler);
			});
		}

		return intercept(cyHandler);
	}),
);

cy.trpc = trpcStub;

const isoDateRegex =
	/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}\.\d*)(?:Z|([+-])([\d:|]*))?$/;

export const dateReviver = (data: any) => {
	try {
		return JSON.parse(JSON.stringify(data), (_key, value) => {
			if (typeof value === 'string' && isoDateRegex.test(value)) {
				return new Date(value);
			}
			return value;
		});
	} catch {
		// Ignoring
	}
	return data;
};

Cypress.Commands.add('force404', () => {
	cy.intercept('/rpc/**', { statusCode: 404, body: 'unmocked disallowed' });
});

Cypress.Commands.add(
	'navigateToStation',
	(
		value: string,
		{
			findPrefix,
		}: {
			isStubbed?: boolean;
			findPrefix?: string;
		} = {},
	) => {
		const baseFind = findPrefix ? cy.findByTestId(findPrefix) : cy;

		baseFind.findByTestId('stopPlaceSearchInput').type(value);
		cy.findAllByTestId('stopPlaceSearchMenuItem').first().click().wait(100);
	},
);

Cypress.Commands.add('theme', (type) => {
	cy.findByTestId('navToggle').click();
	cy.findByTestId('themes').click();
	cy.findByTestId('themeList').find(`[data-value="${type}"]`).click();
	cy.get('.MuiBackdrop-root').should('not.exist');
});

Cypress.Commands.add('closeModal', () => {
	cy.get('body').type('{esc}');
	cy.get('.MuiBackdrop-root').should('not.exist');
});

export interface MockStopPlaceOptions {
	lookbehind: number;
	lookahead: number;
	delay: number;
	name: string;
	stopPlaceFixture: string;
	departureFixture: string;
	startTime?: Date;
	id: string;
}

Cypress.Commands.add(
	'mockDepartures',
	({
		lookahead = 150,
		lookbehind = 10,
		departureFixture,
		stopPlaceFixture,
		evaNumber,
		name,
		delay = 200,
		startTime,
	}) => {
		cy.trpc.iris.abfahrten(
			{
				evaNumber,
				lookahead,
				lookbehind,
				startTime,
			},
			{
				delay,
				fixture: departureFixture,
			},
		);
		cy.trpc.stopPlace.byName(
			{
				searchTerm: name,
			},
			{
				fixture: stopPlaceFixture,
			},
		);
	},
);

// Cypress.Commands.add(
// 	'mockHannover',
// 	({ lookbehind = 10, lookahead = 150, delay = 0, startTime } = {}) => {
// 		mockStopPlace({
// 			lookahead,
// 			lookbehind,
// 			delay,
// 			startTime,
// 			name: 'Hannover Hbf',
// 			stopPlaceFixture: 'stopPlaceSearchHannoverHbf',
// 			departureFixture: 'abfahrtenHannoverHbf',
// 			id: '8000152',
// 		});
// 	},
// );

Cypress.Commands.add('openSettings', () => {
	cy.findByTestId('navToggle').click();
	cy.findByTestId('openSettings').click();
});
