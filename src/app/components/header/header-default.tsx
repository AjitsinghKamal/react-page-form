//#region imports
import cx from 'clsx';
import css from './header-default.module.scss';
//#endregion

function HeaderDefault() {
	return (
		<header className={cx('container', css.header)} role="banner">
			<div className={cx('flex', 'h-full', css.header_content)}>
				<span>Random</span>
			</div>
		</header>
	);
}

export default HeaderDefault;
