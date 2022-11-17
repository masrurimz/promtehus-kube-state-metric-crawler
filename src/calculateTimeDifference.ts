import dayjs, { Dayjs } from "dayjs";

export const calculateTimeDifference = (
	podStartTime: Date,
	podStateStarted: Date,
) => {
	const duration = dayjs(podStateStarted).diff(dayjs(podStartTime));

	return {
		duration,
	};
};
