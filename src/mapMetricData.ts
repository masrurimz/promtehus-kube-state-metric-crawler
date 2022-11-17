import { AxiosResponse } from "axios";
import { KubePodContainerStateStartedAPIResponse } from "./api.type";
import { Metrics } from "./global.type";

export const mapMetricData = (
	data: AxiosResponse<KubePodContainerStateStartedAPIResponse>[],
) => {
	const metrics: Metrics = {};
	const uids: string[] = [];

	data.forEach((d) => {
		d.data.data.result.forEach((m) => {
			const { __name__, uid, pod } = m.metric;
			const value = Number(m.value[1]);
			const key = __name__;

			uids.push(uid);

			metrics[key] = {
				...metrics[key],
				[uid]: {
					metricName: __name__,
					pod,
					uid,
					value,
				},
			};
		});
	});

	return {
		metrics,
		uids: Array.from(new Set(uids)),
	};
};
