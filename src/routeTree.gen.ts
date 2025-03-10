/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as AboutImport } from './routes/about';
import { Route as TrainRunsRouteImport } from './routes/trainRuns/route';
import { Route as RoutingRouteImport } from './routes/routing/route';
import { Route as AbfahrtenRouteImport } from './routes/_abfahrten/route';
import { Route as TrainRunsIndexImport } from './routes/trainRuns/index';
import { Route as RoutingIndexImport } from './routes/routing/index';
import { Route as AbfahrtenIndexImport } from './routes/_abfahrten/index';
import { Route as AbfahrtenStopPlaceImport } from './routes/_abfahrten/$stopPlace';
import { Route as RoutingStartIndexImport } from './routes/routing/$start/index';
import { Route as DetailsTrainIndexImport } from './routes/details/$train/index';
import { Route as DetailsTrainInitialDepartureImport } from './routes/details/$train/$initialDeparture';
import { Route as RoutingStartDestinationIndexImport } from './routes/routing/$start/$destination/index';
import { Route as DetailsTrainJJourneyIdImport } from './routes/details/$train/j.$journeyId';
import { Route as DetailsTrainHJidImport } from './routes/details/$train/h.$jid';
import { Route as RoutingStartDestinationDateIndexImport } from './routes/routing/$start/$destination/$date/index';
import { Route as RoutingStartDestinationDateViaIndexImport } from './routes/routing/$start/$destination/$date/$via/index';

// Create/Update Routes

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any);

const TrainRunsRouteRoute = TrainRunsRouteImport.update({
  id: '/trainRuns',
  path: '/trainRuns',
  getParentRoute: () => rootRoute,
} as any);

const RoutingRouteRoute = RoutingRouteImport.update({
  id: '/routing',
  path: '/routing',
  getParentRoute: () => rootRoute,
} as any);

const AbfahrtenRouteRoute = AbfahrtenRouteImport.update({
  id: '/_abfahrten',
  getParentRoute: () => rootRoute,
} as any);

const TrainRunsIndexRoute = TrainRunsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => TrainRunsRouteRoute,
} as any);

const RoutingIndexRoute = RoutingIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => RoutingRouteRoute,
} as any);

const AbfahrtenIndexRoute = AbfahrtenIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AbfahrtenRouteRoute,
} as any);

const AbfahrtenStopPlaceRoute = AbfahrtenStopPlaceImport.update({
  id: '/$stopPlace',
  path: '/$stopPlace',
  getParentRoute: () => AbfahrtenRouteRoute,
} as any);

const RoutingStartIndexRoute = RoutingStartIndexImport.update({
  id: '/$start/',
  path: '/$start/',
  getParentRoute: () => RoutingRouteRoute,
} as any);

const DetailsTrainIndexRoute = DetailsTrainIndexImport.update({
  id: '/details/$train/',
  path: '/details/$train/',
  getParentRoute: () => rootRoute,
} as any);

const DetailsTrainInitialDepartureRoute =
  DetailsTrainInitialDepartureImport.update({
    id: '/details/$train/$initialDeparture',
    path: '/details/$train/$initialDeparture',
    getParentRoute: () => rootRoute,
  } as any);

const RoutingStartDestinationIndexRoute =
  RoutingStartDestinationIndexImport.update({
    id: '/$start/$destination/',
    path: '/$start/$destination/',
    getParentRoute: () => RoutingRouteRoute,
  } as any);

const DetailsTrainJJourneyIdRoute = DetailsTrainJJourneyIdImport.update({
  id: '/details/$train/j/$journeyId',
  path: '/details/$train/j/$journeyId',
  getParentRoute: () => rootRoute,
} as any);

const DetailsTrainHJidRoute = DetailsTrainHJidImport.update({
  id: '/details/$train/h/$jid',
  path: '/details/$train/h/$jid',
  getParentRoute: () => rootRoute,
} as any);

const RoutingStartDestinationDateIndexRoute =
  RoutingStartDestinationDateIndexImport.update({
    id: '/$start/$destination/$date/',
    path: '/$start/$destination/$date/',
    getParentRoute: () => RoutingRouteRoute,
  } as any);

const RoutingStartDestinationDateViaIndexRoute =
  RoutingStartDestinationDateViaIndexImport.update({
    id: '/$start/$destination/$date/$via/',
    path: '/$start/$destination/$date/$via/',
    getParentRoute: () => RoutingRouteRoute,
  } as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_abfahrten': {
      id: '/_abfahrten';
      path: '';
      fullPath: '';
      preLoaderRoute: typeof AbfahrtenRouteImport;
      parentRoute: typeof rootRoute;
    };
    '/routing': {
      id: '/routing';
      path: '/routing';
      fullPath: '/routing';
      preLoaderRoute: typeof RoutingRouteImport;
      parentRoute: typeof rootRoute;
    };
    '/trainRuns': {
      id: '/trainRuns';
      path: '/trainRuns';
      fullPath: '/trainRuns';
      preLoaderRoute: typeof TrainRunsRouteImport;
      parentRoute: typeof rootRoute;
    };
    '/about': {
      id: '/about';
      path: '/about';
      fullPath: '/about';
      preLoaderRoute: typeof AboutImport;
      parentRoute: typeof rootRoute;
    };
    '/_abfahrten/$stopPlace': {
      id: '/_abfahrten/$stopPlace';
      path: '/$stopPlace';
      fullPath: '/$stopPlace';
      preLoaderRoute: typeof AbfahrtenStopPlaceImport;
      parentRoute: typeof AbfahrtenRouteImport;
    };
    '/_abfahrten/': {
      id: '/_abfahrten/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof AbfahrtenIndexImport;
      parentRoute: typeof AbfahrtenRouteImport;
    };
    '/routing/': {
      id: '/routing/';
      path: '/';
      fullPath: '/routing/';
      preLoaderRoute: typeof RoutingIndexImport;
      parentRoute: typeof RoutingRouteImport;
    };
    '/trainRuns/': {
      id: '/trainRuns/';
      path: '/';
      fullPath: '/trainRuns/';
      preLoaderRoute: typeof TrainRunsIndexImport;
      parentRoute: typeof TrainRunsRouteImport;
    };
    '/details/$train/$initialDeparture': {
      id: '/details/$train/$initialDeparture';
      path: '/details/$train/$initialDeparture';
      fullPath: '/details/$train/$initialDeparture';
      preLoaderRoute: typeof DetailsTrainInitialDepartureImport;
      parentRoute: typeof rootRoute;
    };
    '/details/$train/': {
      id: '/details/$train/';
      path: '/details/$train';
      fullPath: '/details/$train';
      preLoaderRoute: typeof DetailsTrainIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/routing/$start/': {
      id: '/routing/$start/';
      path: '/$start';
      fullPath: '/routing/$start';
      preLoaderRoute: typeof RoutingStartIndexImport;
      parentRoute: typeof RoutingRouteImport;
    };
    '/details/$train/h/$jid': {
      id: '/details/$train/h/$jid';
      path: '/details/$train/h/$jid';
      fullPath: '/details/$train/h/$jid';
      preLoaderRoute: typeof DetailsTrainHJidImport;
      parentRoute: typeof rootRoute;
    };
    '/details/$train/j/$journeyId': {
      id: '/details/$train/j/$journeyId';
      path: '/details/$train/j/$journeyId';
      fullPath: '/details/$train/j/$journeyId';
      preLoaderRoute: typeof DetailsTrainJJourneyIdImport;
      parentRoute: typeof rootRoute;
    };
    '/routing/$start/$destination/': {
      id: '/routing/$start/$destination/';
      path: '/$start/$destination';
      fullPath: '/routing/$start/$destination';
      preLoaderRoute: typeof RoutingStartDestinationIndexImport;
      parentRoute: typeof RoutingRouteImport;
    };
    '/routing/$start/$destination/$date/': {
      id: '/routing/$start/$destination/$date/';
      path: '/$start/$destination/$date';
      fullPath: '/routing/$start/$destination/$date';
      preLoaderRoute: typeof RoutingStartDestinationDateIndexImport;
      parentRoute: typeof RoutingRouteImport;
    };
    '/routing/$start/$destination/$date/$via/': {
      id: '/routing/$start/$destination/$date/$via/';
      path: '/$start/$destination/$date/$via';
      fullPath: '/routing/$start/$destination/$date/$via';
      preLoaderRoute: typeof RoutingStartDestinationDateViaIndexImport;
      parentRoute: typeof RoutingRouteImport;
    };
  }
}

// Create and export the route tree

interface AbfahrtenRouteRouteChildren {
  AbfahrtenStopPlaceRoute: typeof AbfahrtenStopPlaceRoute;
  AbfahrtenIndexRoute: typeof AbfahrtenIndexRoute;
}

const AbfahrtenRouteRouteChildren: AbfahrtenRouteRouteChildren = {
  AbfahrtenStopPlaceRoute: AbfahrtenStopPlaceRoute,
  AbfahrtenIndexRoute: AbfahrtenIndexRoute,
};

const AbfahrtenRouteRouteWithChildren = AbfahrtenRouteRoute._addFileChildren(
  AbfahrtenRouteRouteChildren,
);

interface RoutingRouteRouteChildren {
  RoutingIndexRoute: typeof RoutingIndexRoute;
  RoutingStartIndexRoute: typeof RoutingStartIndexRoute;
  RoutingStartDestinationIndexRoute: typeof RoutingStartDestinationIndexRoute;
  RoutingStartDestinationDateIndexRoute: typeof RoutingStartDestinationDateIndexRoute;
  RoutingStartDestinationDateViaIndexRoute: typeof RoutingStartDestinationDateViaIndexRoute;
}

const RoutingRouteRouteChildren: RoutingRouteRouteChildren = {
  RoutingIndexRoute: RoutingIndexRoute,
  RoutingStartIndexRoute: RoutingStartIndexRoute,
  RoutingStartDestinationIndexRoute: RoutingStartDestinationIndexRoute,
  RoutingStartDestinationDateIndexRoute: RoutingStartDestinationDateIndexRoute,
  RoutingStartDestinationDateViaIndexRoute:
    RoutingStartDestinationDateViaIndexRoute,
};

const RoutingRouteRouteWithChildren = RoutingRouteRoute._addFileChildren(
  RoutingRouteRouteChildren,
);

interface TrainRunsRouteRouteChildren {
  TrainRunsIndexRoute: typeof TrainRunsIndexRoute;
}

const TrainRunsRouteRouteChildren: TrainRunsRouteRouteChildren = {
  TrainRunsIndexRoute: TrainRunsIndexRoute,
};

const TrainRunsRouteRouteWithChildren = TrainRunsRouteRoute._addFileChildren(
  TrainRunsRouteRouteChildren,
);

export interface FileRoutesByFullPath {
  '': typeof AbfahrtenRouteRouteWithChildren;
  '/routing': typeof RoutingRouteRouteWithChildren;
  '/trainRuns': typeof TrainRunsRouteRouteWithChildren;
  '/about': typeof AboutRoute;
  '/$stopPlace': typeof AbfahrtenStopPlaceRoute;
  '/': typeof AbfahrtenIndexRoute;
  '/routing/': typeof RoutingIndexRoute;
  '/trainRuns/': typeof TrainRunsIndexRoute;
  '/details/$train/$initialDeparture': typeof DetailsTrainInitialDepartureRoute;
  '/details/$train': typeof DetailsTrainIndexRoute;
  '/routing/$start': typeof RoutingStartIndexRoute;
  '/details/$train/h/$jid': typeof DetailsTrainHJidRoute;
  '/details/$train/j/$journeyId': typeof DetailsTrainJJourneyIdRoute;
  '/routing/$start/$destination': typeof RoutingStartDestinationIndexRoute;
  '/routing/$start/$destination/$date': typeof RoutingStartDestinationDateIndexRoute;
  '/routing/$start/$destination/$date/$via': typeof RoutingStartDestinationDateViaIndexRoute;
}

export interface FileRoutesByTo {
  '/about': typeof AboutRoute;
  '/$stopPlace': typeof AbfahrtenStopPlaceRoute;
  '/': typeof AbfahrtenIndexRoute;
  '/routing': typeof RoutingIndexRoute;
  '/trainRuns': typeof TrainRunsIndexRoute;
  '/details/$train/$initialDeparture': typeof DetailsTrainInitialDepartureRoute;
  '/details/$train': typeof DetailsTrainIndexRoute;
  '/routing/$start': typeof RoutingStartIndexRoute;
  '/details/$train/h/$jid': typeof DetailsTrainHJidRoute;
  '/details/$train/j/$journeyId': typeof DetailsTrainJJourneyIdRoute;
  '/routing/$start/$destination': typeof RoutingStartDestinationIndexRoute;
  '/routing/$start/$destination/$date': typeof RoutingStartDestinationDateIndexRoute;
  '/routing/$start/$destination/$date/$via': typeof RoutingStartDestinationDateViaIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  '/_abfahrten': typeof AbfahrtenRouteRouteWithChildren;
  '/routing': typeof RoutingRouteRouteWithChildren;
  '/trainRuns': typeof TrainRunsRouteRouteWithChildren;
  '/about': typeof AboutRoute;
  '/_abfahrten/$stopPlace': typeof AbfahrtenStopPlaceRoute;
  '/_abfahrten/': typeof AbfahrtenIndexRoute;
  '/routing/': typeof RoutingIndexRoute;
  '/trainRuns/': typeof TrainRunsIndexRoute;
  '/details/$train/$initialDeparture': typeof DetailsTrainInitialDepartureRoute;
  '/details/$train/': typeof DetailsTrainIndexRoute;
  '/routing/$start/': typeof RoutingStartIndexRoute;
  '/details/$train/h/$jid': typeof DetailsTrainHJidRoute;
  '/details/$train/j/$journeyId': typeof DetailsTrainJJourneyIdRoute;
  '/routing/$start/$destination/': typeof RoutingStartDestinationIndexRoute;
  '/routing/$start/$destination/$date/': typeof RoutingStartDestinationDateIndexRoute;
  '/routing/$start/$destination/$date/$via/': typeof RoutingStartDestinationDateViaIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | ''
    | '/routing'
    | '/trainRuns'
    | '/about'
    | '/$stopPlace'
    | '/'
    | '/routing/'
    | '/trainRuns/'
    | '/details/$train/$initialDeparture'
    | '/details/$train'
    | '/routing/$start'
    | '/details/$train/h/$jid'
    | '/details/$train/j/$journeyId'
    | '/routing/$start/$destination'
    | '/routing/$start/$destination/$date'
    | '/routing/$start/$destination/$date/$via';
  fileRoutesByTo: FileRoutesByTo;
  to:
    | '/about'
    | '/$stopPlace'
    | '/'
    | '/routing'
    | '/trainRuns'
    | '/details/$train/$initialDeparture'
    | '/details/$train'
    | '/routing/$start'
    | '/details/$train/h/$jid'
    | '/details/$train/j/$journeyId'
    | '/routing/$start/$destination'
    | '/routing/$start/$destination/$date'
    | '/routing/$start/$destination/$date/$via';
  id:
    | '__root__'
    | '/_abfahrten'
    | '/routing'
    | '/trainRuns'
    | '/about'
    | '/_abfahrten/$stopPlace'
    | '/_abfahrten/'
    | '/routing/'
    | '/trainRuns/'
    | '/details/$train/$initialDeparture'
    | '/details/$train/'
    | '/routing/$start/'
    | '/details/$train/h/$jid'
    | '/details/$train/j/$journeyId'
    | '/routing/$start/$destination/'
    | '/routing/$start/$destination/$date/'
    | '/routing/$start/$destination/$date/$via/';
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  AbfahrtenRouteRoute: typeof AbfahrtenRouteRouteWithChildren;
  RoutingRouteRoute: typeof RoutingRouteRouteWithChildren;
  TrainRunsRouteRoute: typeof TrainRunsRouteRouteWithChildren;
  AboutRoute: typeof AboutRoute;
  DetailsTrainInitialDepartureRoute: typeof DetailsTrainInitialDepartureRoute;
  DetailsTrainIndexRoute: typeof DetailsTrainIndexRoute;
  DetailsTrainHJidRoute: typeof DetailsTrainHJidRoute;
  DetailsTrainJJourneyIdRoute: typeof DetailsTrainJJourneyIdRoute;
}

const rootRouteChildren: RootRouteChildren = {
  AbfahrtenRouteRoute: AbfahrtenRouteRouteWithChildren,
  RoutingRouteRoute: RoutingRouteRouteWithChildren,
  TrainRunsRouteRoute: TrainRunsRouteRouteWithChildren,
  AboutRoute: AboutRoute,
  DetailsTrainInitialDepartureRoute: DetailsTrainInitialDepartureRoute,
  DetailsTrainIndexRoute: DetailsTrainIndexRoute,
  DetailsTrainHJidRoute: DetailsTrainHJidRoute,
  DetailsTrainJJourneyIdRoute: DetailsTrainJJourneyIdRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_abfahrten",
        "/routing",
        "/trainRuns",
        "/about",
        "/details/$train/$initialDeparture",
        "/details/$train/",
        "/details/$train/h/$jid",
        "/details/$train/j/$journeyId"
      ]
    },
    "/_abfahrten": {
      "filePath": "_abfahrten/route.tsx",
      "children": [
        "/_abfahrten/$stopPlace",
        "/_abfahrten/"
      ]
    },
    "/routing": {
      "filePath": "routing/route.tsx",
      "children": [
        "/routing/",
        "/routing/$start/",
        "/routing/$start/$destination/",
        "/routing/$start/$destination/$date/",
        "/routing/$start/$destination/$date/$via/"
      ]
    },
    "/trainRuns": {
      "filePath": "trainRuns/route.tsx",
      "children": [
        "/trainRuns/"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/_abfahrten/$stopPlace": {
      "filePath": "_abfahrten/$stopPlace.tsx",
      "parent": "/_abfahrten"
    },
    "/_abfahrten/": {
      "filePath": "_abfahrten/index.tsx",
      "parent": "/_abfahrten"
    },
    "/routing/": {
      "filePath": "routing/index.tsx",
      "parent": "/routing"
    },
    "/trainRuns/": {
      "filePath": "trainRuns/index.tsx",
      "parent": "/trainRuns"
    },
    "/details/$train/$initialDeparture": {
      "filePath": "details/$train/$initialDeparture.tsx"
    },
    "/details/$train/": {
      "filePath": "details/$train/index.tsx"
    },
    "/routing/$start/": {
      "filePath": "routing/$start/index.tsx",
      "parent": "/routing"
    },
    "/details/$train/h/$jid": {
      "filePath": "details/$train/h.$jid.tsx"
    },
    "/details/$train/j/$journeyId": {
      "filePath": "details/$train/j.$journeyId.tsx"
    },
    "/routing/$start/$destination/": {
      "filePath": "routing/$start/$destination/index.tsx",
      "parent": "/routing"
    },
    "/routing/$start/$destination/$date/": {
      "filePath": "routing/$start/$destination/$date/index.tsx",
      "parent": "/routing"
    },
    "/routing/$start/$destination/$date/$via/": {
      "filePath": "routing/$start/$destination/$date/$via/index.tsx",
      "parent": "/routing"
    }
  }
}
ROUTE_MANIFEST_END */
