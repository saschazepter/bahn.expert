import { fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { render } from 'testHelper';
import React from 'react';
import Zugsuche from 'Common/Components/Zugsuche';

describe('Zugsuche', () => {
  const dummyTrigger = (toggleModal: any) => (
    <div onClick={toggleModal} data-testid="dummytoggle" />
  );

  const renderZugsuche = () =>
    render(Zugsuche, { children: dummyTrigger }, { withNavigation: true });

  it('renders children', () => {
    const { getByTestId } = renderZugsuche();

    getByTestId('dummytoggle');
  });

  it('closed by default', () => {
    const { queryByTestId } = renderZugsuche();

    expect(queryByTestId('Zugsuche')).toBeNull();
  });

  it('can be opened', () => {
    const { getByTestId } = renderZugsuche();

    getByTestId('dummytoggle').click();
    getByTestId('Zugsuche');
  });

  it('entering nothing & submit keeps it open', async () => {
    const { getByTestId } = renderZugsuche();

    getByTestId('dummytoggle').click();
    getByTestId('ZugsucheSubmit').click();
    await new Promise(resolve => setTimeout(resolve, 200));
    getByTestId('Zugsuche');
  });

  it('Navigates to details', async () => {
    const { getByTestId, queryByTestId } = renderZugsuche();

    getByTestId('dummytoggle').click();
    fireEvent.change(getByTestId('ZugsucheInput'), {
      target: { value: 'EC 6 ' },
    });
    getByTestId('ZugsucheSubmit').click();
    await waitForElementToBeRemoved(() => getByTestId('Zugsuche'));
    expect(queryByTestId('Zugsuche')).toBeNull();
  });
});
