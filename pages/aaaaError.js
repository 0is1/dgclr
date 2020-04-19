import React from 'react';

import { withTranslation } from 'lib/i18n';

type Props = {
  statusCode?: number,
  t: Function,
};

const Error = ({ statusCode, t }: Props) => <p>{statusCode ? t('error-with-status', { statusCode }) : t('error-without-status')}</p>;

Error.getInitialProps = async ({ res, err }) => {
  let statusCode = null;
  if (res) {
    ({ statusCode } = res);
  } else if (err) {
    ({ statusCode } = err);
  }
  return {
    namespacesRequired: ['common'],
    statusCode,
  };
};

Error.defaultProps = {
  statusCode: null,
};

export default withTranslation('common')(Error);
