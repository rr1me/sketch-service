import React, { FC, ReactElement, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { shallowEqual } from 'react-redux';

let prevChildAmount = 0;
let prevChild:any = null;
let same = true;

const AnimationNotification: FC<{ children: any }> = ({ children }) => {
	if (prevChild === null) prevChild = children

	// const [isSame, setIsSame] = useState(false);

	useLayoutEffect(() => {

		if (children.length < 1){
			same = true;
			return;
		}

		if (children.length !== prevChild.length){
			same = false;
			return;
		}

		same = !children.some((v:any, i:number) => {
			// console.log(v, prevChild);
			return prevChild[i].key !== v.key
		})
		// console.log(same);
		// setIsSame(same)

	}, [children])

	useEffect(() => {
		const childAmount = children.length;

		const childArray = React.Children.toArray(children) as any[];

		console.log(same);
		prevChild = children

		if (prevChildAmount <= childAmount && !same) {
			// const child = React.Children.only(children[0]);
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
				childArray.slice(0, -1).forEach((v: any) => {
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
		// prevChild = children


		// React.Children.forEach(children, (child: any, i) => {
		// 	const domNode = child.ref.current;
		// 	console.log(child, domNode);

		// requestAnimationFrame(() => {
		// 	// Before the DOM paints, invert child to old position
		// 	domNode.style.transform = '';
		// 	domNode.style.transition = 'transform 0s';
		//
		// 	requestAnimationFrame(() => {
		// 		// After the previous frame, remove
		// 		// the transistion to play the animation
		// 		domNode.style.transform = i === 0 ? 'translateX(150px)' : 'translateY(-150px)';
		// 		domNode.style.transition = 'transform 500ms';
		// 	});
		// });
		// const match = domNode.style.transform.match(/\d+/);
		// console.log(match);
		// const prev = parseInt(match !== null ? match[0] : '0') + i * 10;
		// const isFirst = i === 0;
		// requestAnimationFrame(() => {
		// 	domNode.style.transform = isFirst ? 'translateX(100%)' : ''
		// 	domNode.style.transition = 'transform 0s';
		//
		// 	requestAnimationFrame(() => {
		// 		domNode.style.transform = isFirst ? '' : 'translateY(-' + (50 + prev) +'px)'
		// 		domNode.style.transition = 'transform 300ms'
		// 	})
		// });

		// const match = domNode.style.transform.match(/\d+/);
		// console.log(match);
		// const prev = parseInt(match !== null ? match[0] : '0') + i * 10;
		//
		// const isFirst = i === 0;
		// requestAnimationFrame(() => {
		// 	// domNode.style.transition = 'transform 300ms'
		// 	domNode.style.transform = isFirst ? 'translateX(100%)' : 'translateY(-' + (50 + prev) +'px)'
		// })
		// console.log(forced.current);
		// if (!forced.current){
		// 	setTimeout(() => {
		// 		requestAnimationFrame(() => {
		// 			domNode.style.transform = isFirst ? 'translateX(100%)' : 'translateY(-' + (50 + prev) +'px)'
		// 		})
		// 		forced.current = true;
		// 		forceUpdate()
		// 	}, 500)
		// }else{
		// 	forced.current = false;
		// }

		// console.log(domNode.style);

		// });
	});

	return <>{children}</>;
};

export default AnimationNotification;