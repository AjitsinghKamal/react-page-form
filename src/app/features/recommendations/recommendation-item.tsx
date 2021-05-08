//#region imports
import cx from 'classnames';
import { RecommendationsResponse } from 'app/apis/challenge';

import css from './item.module.scss';
import { convertSnakeToNormalCase } from 'app/utilties/format';
//#endregion

type Props = {
	data: RecommendationsResponse;
};
function RecommendationItem({ data }: Props) {
	return (
		<li
			data-testid="rec-item"
			className={cx('my-12', 'px-16', 'py-12', css.item)}
		>
			<span className={css.item_type}>
				{convertSnakeToNormalCase(data.type)}
			</span>
			<div>
				<span className={css.item_amount}>{data.price.amount}</span>
				<span className={cx('mx-8', css.item_duration)}>
					per {data.price.periodicity}
				</span>
			</div>
		</li>
	);
}

export default RecommendationItem;
