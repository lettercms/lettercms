import { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import connect from '@lettercms/utils/lib/connection';
import pages from '@lettercms/models/pages';
import Script from 'next/script';
import sdk from '@lettercms/sdk';
import {DashboardProvider, useUser} from '@/lib/dashboardContext';
import {getSession} from 'next-auth/react';
import asyncImportScript from '@/lib/asyncImportScript';
import Editor from '@/components/admin/pages/createEditor';
import Head from 'next/head';
import Save from '@/components/svg/save';
import Send from '@/components/svg/send';
import Load from '@/components/logoLoad';

const isDev = process.env.NODE_ENV !== 'production';
const endpoint = isDev ? 'http://localhost:3009' : 'https://lettercms-api-staging.herokuapp.com';

const editor = new Editor();

const scripts = [
  'grapesjs-preset-webpage@0.1.11/dist/grapesjs-preset-webpage.min.js',
  'grapesjs-style-bg@1.0.5/dist/grapesjs-style-bg.min.js',
  'grapesjs-typed@1.0.5/dist/grapesjs-typed.min.js',
  'grapesjs-tooltip@0.1.7/dist/index.js',
  'grapesjs-parser-postcss@1.0.1/dist/index.js',
  'grapesjs-touch@0.1.1/dist/grapesjs-touch.min.js',
  'grapesjs-custom-code@1.0.1/dist/index.js',
  'grapesjs-tabs@1.0.6/dist/grapesjs-tabs.min.js',
  'grapesjs-lory-slider@0.1.5/dist/grapesjs-lory-slider.min.js',
  'grapesjs-tui-image-editor@0.1.3/dist/grapesjs-tui-image-editor.min.js'
];

export async function getServerSideProps({ req, res, query}) {
  const session = await getSession({req});

  if (!session)
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    };

  await connect();
  const existsPage = await pages.exists({_id: query.pageID});

  if (!existsPage)
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard/pages'
      }
    };

  return {
    props: {
      user: session.user,
      hideLayout: true
    }
  };
}

function PageEditor() {
  const [load, setLoad] = useState(true);
  const [preview, setPreview] = useState(false);
  const [isGrapesReady, setGrapesStatus] = useState(false);
  const {status} = useUser();
  
  const {query: {pageID}} = useRouter();

  editor.onPreview = setPreview;

  useEffect(() => {
    if (status === 'done') {
      asyncImportScript('grapesjs-css', 'https://unpkg.com/grapesjs@0.19.5/dist/css/grapes.min.css', 'css');
      asyncImportScript('grapesjs', 'https://unpkg.com/grapesjs@0.19.5/dist/grapes.min.js', {
        retry: 5
      }).then(() => {
        Promise.all(scripts.map(e => {
          return asyncImportScript(e, `https://unpkg.com/${e}`, {
            async: true,
            retry: 3
          });
        }))
        .then(() => editor.init(pageID))
        .then(() => setLoad(false));
      });
    }
    
    return () => {
      scripts.map(e => {
        document.getElementById(e)?.remove();
      });
      delete window.grapesjs;
    };
  }, [status]);
  
  return <div style={{height: '100%'}}>
    <Head>
      <title>Editar Página | Dashboard - LetterCMS</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {
      load &&
      <Load/>
    }
    <div id="gjs"></div>
    {
      !load &&
      <div id='buttons' style={{display: preview ? 'none' : 'flex'}}>
        <button className="btn-outline-sm circle save" onClick={editor.save}>
          <Save fill='#5f4dee'/>
        </button>
        <button className="btn-outline-sm circle send" onClick={editor.publish}>
          <Send fill='#fff'/>
        </button>
      </div>
    }
    <style jsx>{`
      div#buttons {
        display: flex;
        position: absolute;
        flex-direction: column;
        right: calc(15% + 15px);
        bottom: 0;
        z-index: 1;
      }
      div#buttons button {
        width: 4.5rem;
        height: 4.5rem;
        margin: 12.5% 0;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1.5rem;
      }
      :global(div#buttons button:disabled path) {
        fill: #fff !important;
      }
      div#buttons button.send {
        background: #5f4dee;
      }
      div#buttons button.send:hover {
        background: #fff;
      }
      :global(div#buttons button.send:hover path) {
        fill: #5f4dee;
      }
      div#buttons button.save {
        background: #fff;
      }
      div#buttons button.save:hover {
        background: #5f4dee;
      }
      :global(div#buttons button.save:hover path) {
        fill: #fff;
      }
    `}</style>
    <style jsx global>{`
      .icon-add-comp::before, .icon-comp100::before,.icon-comp50::before,.icon-comp30::before,.icon-rm::before{ content: '';}
      .icon-add-comp {
        background: url("https://grapesjs.com/img/icon-sq-a.png") no-repeat center;
      }
      .icon-comp100 {
        background: url("https://grapesjs.com/img/icon-sq-1.png") no-repeat center;
      }
      .icon-comp50 {
        background: url("https://grapesjs.com/img/icon-sq-2.png") no-repeat center;
      }
      .icon-comp30 {
        background: url("https://grapesjs.com/img/icon-sq-3.png") no-repeat center;
      }
      .icon-rm {
        background: url("https://grapesjs.com/img/icon-sq-r.png") no-repeat center;
      }

      .icons-flex {
        background-size: 70% 65% !important;
        height: 24px;
        width: 17px;
        opacity: 0.9;
      }
      .icon-dir-row {
        background: url("https://grapesjs.com/img/flex-dir-row.png") no-repeat center;
      }
      .icon-dir-row-rev {
        background: url("https://grapesjs.com/img/flex-dir-row-rev.png") no-repeat center;
      }
      .icon-dir-col {
        background: url("https://grapesjs.com/img/flex-dir-col.png") no-repeat center;
      }
      .icon-dir-col-rev {
        background: url("https://grapesjs.com/img/flex-dir-col-rev.png") no-repeat center;
      }
      .icon-just-start{
       background: url("https://grapesjs.com/img/flex-just-start.png") no-repeat center;
      }
      .icon-just-end{
       background: url("https://grapesjs.com/img/flex-just-end.png") no-repeat center;
      }
      .icon-just-sp-bet{
       background: url("https://grapesjs.com/img/flex-just-sp-bet.png") no-repeat center;
      }
      .icon-just-sp-ar{
       background: url("https://grapesjs.com/img/flex-just-sp-ar.png") no-repeat center;
      }
      .icon-just-sp-cent{
       background: url("https://grapesjs.com/img/flex-just-sp-cent.png") no-repeat center;
      }
      .icon-al-start{
       background: url("https://grapesjs.com/img/flex-al-start.png") no-repeat center;
      }
      .icon-al-end{
       background: url("https://grapesjs.com/img/flex-al-end.png") no-repeat center;
      }
      .icon-al-str{
       background: url("https://grapesjs.com/img/flex-al-str.png") no-repeat center;
      }
      .icon-al-center{
       background: url("https://grapesjs.com/img/flex-al-center.png") no-repeat center;
      }

      .gjs-one-bg {
        background-color: #fafafa !important;
      }
      .gjs-radio-item-label,
      label.fa {
        position: initial !important;
        margin: initial !important;
        width: 100%;
        display: block !important;
        color: white !important;
        padding: 7px;
      }
      svg {
        overflow: auto;
        vertical-align: none;
      }
      .gjs-sm-clear {
        height: 18px !important;
      }
      .gjs-field select {
        appearance: initial !important;
        background: none !important;
        font: inherit !important;
        height: auto !important;
      }
      .gjs-sm-properties,
      .gjs-pn-views-container,
      .gjs-pn-views-container .gjs-blocks-cs {
        background: white !important;
      }
      .gjs-sm-sector-title,
      .gjs-pn-views-container .gjs-blocks-cs .gjs-title {
        background: #fafafa !important;
        color: #999 !important;
      }
      .gjs-pn-views-container .gjs-blocks-cs .gjs-title,
      .gjs-category-open,
      .gjs-sm-sector-title,
      .gjs-block-category.gjs-open,
      .gjs-sm-sector.gjs-sm-open {
        border-bottom: 1px solid #c4d8dc !important;
      }
      .gjs-two-color,
      .gjs-clm-label,
      .gjs-sm-header,
      .gjs-layer-caret, 
      .gjs-layer-name {
        color: #999 !important;
      }
      .gjs-pn-btn {
        color: #c4d8dc !important;
      }
      .gjs-four-color {
        color: #5f4dee99 !important;
      }
      .gjs-four-color-h:hover {
          color: #5f4dee99 !important;
      }
      .gjs-block {
        border: 1px solid #c4d8dc !important;
        color: #c4d8dc !important;
      }
      .gjs-field input {
        font: inherit !important;
      }
      .gjs-sm-property .gjs-sm-btn {
        font: inherit !important;
      }
      body {
        line-height: initial;
        font: initial;
      }
      #content,
      #content > div {
        width: 100% !important;
        padding: 0 !important;
        left: 0 !important;
      }
    `}</style>
  </div>;
}

PageEditor.getLayout = function getLayout(page, user) {
  return <DashboardProvider hideMenu={true} accessToken={user.accessToken} userID={user.id}>{page}</DashboardProvider>;
};

export default PageEditor;

/*
aside white
border 1px solid #c4d8dc
color: 555


*/