import React from "react";

import { Typography } from "neetoui";
import { Trans } from "react-i18next";

const Field = ({ translationKey, data }) => (
  <Typography style="body2">
    <Trans
      components={{ span: <span className="font-semibold" /> }}
      i18nKey={translationKey}
      values={{ value: data !== "N/A" ? data : "Not Available" }}
    />
  </Typography>
);

export default Field;
