// #region imports
import { useMemo, PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet';
// #endregion

type Props = {
	title?: string;
	canonicals?: string[];
	socialMeta?: Record<string, string>;
	prefixTitleWithEnv?: boolean;
};

function makeSocialTags(metaDetails: Props['socialMeta']) {
	return (
		<>
			{metaDetails &&
				Object.entries(metaDetails).map((meta: [string, string]) => (
					<meta property={meta[0]} content={meta[1]} />
				))}
		</>
	);
}

const APP_TITLE = import.meta.env.VITE_APP_TITLE;
const IS_DEV = import.meta.env.DEV;

function Seo({
	title,
	canonicals,
	socialMeta,
	children,
	prefixTitleWithEnv,
}: PropsWithChildren<Props>) {
	const pageTitle = useMemo(() => {
		return `${prefixTitleWithEnv && IS_DEV && 'Dev | '}${
			title || APP_TITLE
		}`;
	}, []);
	return (
		<Helmet>
			<title>{pageTitle}</title>
			{canonicals &&
				canonicals.map((link: string) => (
					<link rel="canonical" href={link} />
				))}
			{socialMeta && makeSocialTags(socialMeta)}
			{children}
		</Helmet>
	);
}

export default Seo;
