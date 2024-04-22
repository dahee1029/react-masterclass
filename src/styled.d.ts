import styled from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    boardColor: string;
    cardColor: string;
    bgColor: string;
  }
}
