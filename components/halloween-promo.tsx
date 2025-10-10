'use client';

import { useEffect, useState } from "react";

const SALE_END_DATE = new Date("2025-10-27T23:59:59");

export default function HalloweenPromo() {
	const [timeLeft, setTimeLeft] = useState(getTimeLeft());

	function getTimeLeft() {
		const now = new Date();
		const diff = SALE_END_DATE.getTime() - now.getTime();
		if (diff <= 0) return null;

		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((diff / (1000 * 60)) % 60);
		const seconds = Math.floor((diff / 1000) % 60);

		return { days, hours, minutes, seconds };
	}

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(getTimeLeft());
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	if (!timeLeft) {
		return null; // Sale ended
	}

	return (
		<div className='bg-orange-600 text-white p-4 text-center font-bold'>
			🎃 Halloween Sale! Use code <span className='underline'>HALLOWEEN2025</span>{" "}
			to get 30% off! Ends in {timeLeft.days}d {timeLeft.hours}h{" "}
			{timeLeft.minutes}m {timeLeft.seconds}s
		</div>
	);
}
