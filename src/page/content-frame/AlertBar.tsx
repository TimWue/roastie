import { Alert, Button } from "@mui/material";
import * as React from "react";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  clearError: () => void;
}
export const AlertBar: FunctionComponent<Props> = ({ clearError }) => {
  const navigate = useNavigate();

  return (
    <Alert
      severity="info"
      action={
        <Button
          color="inherit"
          size="small"
          onClick={() => {
            navigate("/settings");
            clearError();
          }}
        >
          Zu den Einstellungen
        </Button>
      }
    >
      Die Verbindung zum MQTT-Broker ist fehlgeschlagen.
    </Alert>
  );
};
