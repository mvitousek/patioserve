// @flow

import * as React from "react";

import Head from "next/head";
import Layout from "../../components/layout";
import Date from "../../components/date";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { type PostIDParams, type PostData } from "../../lib/posts";
import utilStyles from '../../styles/utils.module.css'

export async function getStaticProps({
  params,
}: PostIDParams): Promise<{
  props: { postData: PostData, postContent: string },
}> {
  const postData = await getPostData(params.id);
  return {
    props: postData,
  };
}

export async function getStaticPaths(): Promise<{
  paths: Array<PostIDParams>,
  fallback: boolean,
}> {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({
  postData,
  postContent,
}: {
  postData: PostData,
  postContent: string,
}): React.Node {
  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
     <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postContent }} />
      </article>
    </Layout>
  );
}
