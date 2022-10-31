import { FunctionComponent, ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import { Tab, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Details } from "../details/Details";
import { Save } from "../saveRoast/Save";

type Props = {
  children: ReactNode;
  index: number;
  value: number;
};

const TabPanel: FunctionComponent<Props> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export const SwitchDetailsSave: FunctionComponent = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Details" />
          <Tab label="Speichern" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Details />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Save />
      </TabPanel>
    </Box>
  );
};
