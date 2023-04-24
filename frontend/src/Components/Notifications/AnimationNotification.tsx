import React, { FC, ReactElement, useEffect, useLayoutEffect } from 'react';

let prevChildAmount = 0;
let prevChild: any = null;
let same = true;

const AnimationNotification: FC<{ children: ReactElement[] }> = ({ children }) => {
	if (prevChild === null) prevChild = children;

	useLayoutEffect(() => {

		if (children.length < 1) {
			same = true;
			return;
		}

		if (children.length !== prevChild.length) {
			same = false;
			return;
		}

		same = !children.some((v: ReactElement, i: number) => prevChild[i].key !== v.key);

	}, [children]);

	useEffect(() => {
		const childAmount = children.length;

		const childArray = React.Children.toArray(children) as any[];

		if (prevChildAmount <= childAmount && !same) {
			const child = childArray[childAmount - 1];
			const ref = child.ref.current;

			requestAnimationFrame(() => {
				ref.style.transform = 'translateX(-200%)';
				ref.style.transition = 'transform 0s';

				requestAnimationFrame(() => {
					ref.style.transform = '';
					ref.style.transition = 'transform 300ms';
				});
			});

			setTimeout(() => {
				requestAnimationFrame(() => {
					const match = ref.style.transform.match(/\d+/);
					const prev = parseInt(match !== null ? match[0] : 0);

					ref.style.transform = 'translateY(-' + prev + 'px) translateX(-200%)';
				});
			}, 3000);

			if (childAmount > 1) {
				childArray.slice(0, -1).forEach(v => {
					const ref = v.ref.current;

					const match = ref.style.transform.match(/\d+/g);
					const prev = parseInt(match !== null ? match[0] : 0);

					const notDeleting = match === null || match.length < 2;

					if (notDeleting) {
						requestAnimationFrame(() => {
							ref.style.transform = 'translateY(-' + (50 + prev) + 'px)';
							ref.style.transition = 'transform 300ms';
						});
					}
				});
			}
		}

		prevChildAmount = childAmount;
		prevChild = children;
	});

	return <>{children}</>;
};

export default AnimationNotification;