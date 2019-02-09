import styled, { css } from 'styled-components';
import { Input } from 'rebass';
import colors from 'components/colors';

const Styles = {
  Input: styled(Input)`
    line-height: 1.25;
    width: 100%;
    ${css`
      &[type='range'] {
        background: transparent;
        box-shadow: none;
        -webkit-appearance: none;
        width: 100%;
      }
      &[type='range']:focus {
        outline: none;
      }
      &[type='range']::-webkit-slider-runnable-track {
        animate: 0.2s;
        background: ${colors.greenAlpha};
        border-radius: 2px;
        border: 1px solid ${colors.green};
        cursor: pointer;
        height: 12px;
        width: 100%;
      }
      &[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: #ffffff;
        border-radius: 3px;
        border: 1px solid rgba(0, 0, 0, 0.25);
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25), 0px 0px 1px rgba(13, 13, 13, 0.25);
        cursor: pointer;
        height: 30px;
        margin-top: -10px;
        width: 16px;
      }
      &[type='range']:focus::-webkit-slider-runnable-track {
        background: ${colors.greenAlpha};
      }
      &[type='range']::-moz-range-track {
        animate: 0.2s;
        background: ${colors.greenAlpha};
        border-radius: 2px;
        border: 1px solid ${colors.green};
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25), 0px 0px 1px rgba(13, 13, 13, 0.25);
        cursor: pointer;
        height: 10px;
        width: 100%;
      }
      &[type='range']::-moz-range-thumb {
        background: #ffffff;
        border-radius: 3px;
        border: 1px solid rgba(0, 0, 0, 0.25);
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25), 0px 0px 1px rgba(13, 13, 13, 0.25);
        cursor: pointer;
        height: 30px;
        width: 16px;
      }
      &[type='range']::-ms-track {
        animate: 0.2s;
        background: transparent;
        border-color: transparent;
        border-width: 16px 0;
        color: transparent;
        cursor: pointer;
        height: 12px;
        width: 100%;
      }
      &[type='range']::-ms-fill-lower {
        background: ${colors.greenAlpha};
        border-radius: 3px;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25), 0px 0px 1px rgba(13, 13, 13, 0.25);
      }
      &[type='range']::-ms-fill-upper {
        background: ${colors.greenAlpha};
        border-radius: 2px;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25), 0px 0px 1px rgba(13, 13, 13, 0.25);
      }
      &[type='range']::-ms-thumb {
        background: #ffffff;
        border-radius: 3px;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25), 0px 0px 1px rgba(13, 13, 13, 0.25);
        cursor: pointer;
        height: 30px;
        width: 16px;
      }
      &[type='range']:focus::-ms-fill-lower {
        background: ${colors.greenAlpha};
      }
      &[type='range']:focus::-ms-fill-upper {
        background: ${colors.greenAlpha};
      }
    `};
  `,
};

export default Styles;
