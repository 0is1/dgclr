import styled from 'styled-components';
import colors from 'components/colors';

const Styles = {
  Wrapper: styled.div`
    margin: 0 auto;
    padding-top: 1rem;
  `,
  SearchResultItem: styled.a`
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border: 1px solid ${colors.info};
    border-radius: 3px;
    color: ${colors.text};
    cursor: pointer;
    display: block;
    font-size: 1rem;
    font-weight: 700;
    line-height: 2;
    margin-bottom: 0.5rem;
    padding: 1rem;
    position: relative;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover {
      background-color: ${colors.lighterGray};
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
      color: ${colors.hover};
    }
  `,
  SearchResultIcon: styled.span`
    height: 1.5rem;
    padding-right: 0.5rem;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  `,
};

export default Styles;
