//#region imports
import cx from 'classnames';
import { RecommendationsResponse } from 'app/apis/challenge';
import RecommendationItem from './recommendation-item';
import { Button } from 'app/components';
import css from './recommendations.module.scss';
import { ReactComponent as Loader } from 'src/assets/svgs/pulse.svg';
//#endregion
type Props = {
	loading?: boolean;
	list: RecommendationsResponse[];
	onReset?: () => void;
};
function Recommendations({ loading, list, onReset }: Props) {
	return (
		<section className={cx('flex', 'px-12', css.recommendation)}>
			{loading ? (
				<div
					data-testid="rec-loader"
					className={cx('flex', css.recommendation_placeholder)}
				>
					<p>We are getting your recommendations.</p>
					<Loader
						className={cx(
							'my-12',
							css.recommendation_placeholder_icon
						)}
					/>
				</div>
			) : (
				<div>
					<h2 className={css.recommendation_title}>
						We got your recommendations
					</h2>
					<p className="my-10">
						Based on your answers, this is what makes sense for you
						and what you should pay.
					</p>
					<ul className="my-36">
						{list.map((data, index) => (
							<RecommendationItem data={data} key={index} />
						))}
					</ul>
					<Button className="my-18" onClick={onReset}>
						Restart Evaluation
					</Button>
				</div>
			)}
		</section>
	);
}

export default Recommendations;
