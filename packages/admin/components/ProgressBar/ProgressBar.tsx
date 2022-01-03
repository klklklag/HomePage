import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';

// // 라우터이동할때 로딩 설정
// Router.onRouteChangeStart = (url) => {
//   console.log(url);
//   NProgress.start();
// };
  
// 라우터이동할때 로딩 설정
Router.events.on('routeChangeStart', () => NProgress.start());
// 라우터이동이 완료했을때 설정
Router.events.on('routeChangeComplete', () => NProgress.done());
// 라우터에러발생했을때 로딩 설정
Router.events.on('routeChangeError', () => NProgress.done());

const _ProgressBar = () => {
  return (
    <Head>
      {/* <title>NextPortfolio</title> */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
      />
    </Head>
  );
};

export const ProgressBar = _ProgressBar;