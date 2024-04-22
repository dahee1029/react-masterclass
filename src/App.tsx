import { createGlobalStyle } from 'styled-components';
// import TodoList from './routes/todo/ToDoList';

import Part4 from './routes/part4/part4';
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}

*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
*{
  box-sizing: border-box;
}
body{
  font-weight: 300;
  font-family: "Nanum Gothic Coding", monospace;
  color:black;
  line-height: 1.2;
  background: linear-gradient(135deg,#ffeaa7,#81ecec);
}
`;

function App() {
  // const isDark= useRecoilValue(isDarkAtom);
  return (
    <>
      {/* <ThemeProvider theme={isDark? darktheme: lighttheme}> */}
      <GlobalStyle />
      <Part4 />
      {/* <TodoList /> */}
      {/* <HelmetProvider>
            <Router />
          </HelmetProvider>
        <ReactQueryDevtools initialIsOpen={true}/>
      </ThemeProvider> */}
    </>
  );
}

export default App;
