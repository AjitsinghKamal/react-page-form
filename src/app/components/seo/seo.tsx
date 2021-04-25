// #region imports
import { useMemo, PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet';
// #endregion

type Props = {
	title?: string;
	canonicals?: string[];
	socialMeta?: Record<string, string>;
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
function Seo({
	title,
	canonicals,
	socialMeta,
	children,
}: PropsWithChildren<Props>) {
	const pageTitle = useMemo(() => {
		return `${import.meta.env.DEV && 'Dev| '}${
			title || import.meta.env.VITE_APP_TITLE
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
