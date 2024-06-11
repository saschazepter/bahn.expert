import { Close as CloseIcon } from '@mui/icons-material';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStorage } from '@/client/useStorage';
import type { FC } from 'react';

const CloseButton = styled(IconButton)`
  position: absolute;
  right: 8px;
  top: 8px;
`;

export const PolitikPopup: FC = () => {
  const storage = useStorage();
  const [searchParam] = useSearchParams();
  const [open, setOpen] = useState(
    !(searchParam.get('politic') || storage.get('politicSeen')),
  );
  const close = useCallback(() => {
    storage.set('politicSeen', true);
    setOpen(false);
  }, [storage]);

  if (!open) {
    return null;
  }

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>
        Ich bin sauer (Politik)
        <CloseButton onClick={close}>
          <CloseIcon />
        </CloseButton>
      </DialogTitle>
      <DialogContent dividers>
        Wir haben einen Tag nach der Europawahl und ich bin sauer und traurig...
        <br />
        Hiermit an alle AFD Wählenden: <strong>FICKT EUCH!</strong>
        <br />
        Ihr seid die mit Abstand größte Gefahr für unsere Gesellschaft! Verpisst
        euch einfach von bahn.expert - wenn ich könnte würde ich technisch
        verhindern das ihr hier seid!
        <br />
        Hier und auch nirgends anders will man euch haben. Euer Gedankengut ist
        widerlich, Menschenverachtend und verursacht Brechreiz.
        <br />
        Das Projekt hier soll eigentlich nur eure Bahnfahrten erleichtern. Aber
        in Zeiten wo eine Partei welche in Teilen gesichert rechtsextrem ist und
        überall ein rechtsextremer Verdachtsfall ist muss ich leider Politik
        einbringen.
        <br />
        An alle Menschen die sich gegen Rechtsextremismus und Fachismus
        einsetzen: Danke euch!
        <br />
        An alle Menschen die eher konservativ sind, aber nicht rechtsextrem
        sind, also Mindestens CDU Wählende. Wir mögen politisch nicht zueinander
        finden. Aber immerhin fallt ihr nicht auf die Lügen der AFD rein!
        <br />
        Das reicht dann auch, so lange ihr eure Settings nicht löscht seht ihr
        das hier nicht wieder.
      </DialogContent>
    </Dialog>
  );
};
