import axios from "axios";
import * as path from "path";
import { fileURLToPath } from "url";
import { KubePodContainerStateStartedAPIResponse } from "./api.type";
import { calculateTimeDifference } from "./calculateTimeDifference";
import { CsvFile } from "./csv";
import { generateFullUrl } from "./generateFullUrl";
import { CsvRow } from "./global.type";
import { mapMetricData } from "./mapMetricData";

const urls = [
	generateFullUrl("tugas-rpl", "kube_pod_start_time"),
	generateFullUrl("tugas-rpl", "kube_pod_container_state_started"),
];
const data = await Promise.all(
	urls.map((u) => axios.get<KubePodContainerStateStartedAPIResponse>(u)),
);

const metricsName: string[] = data.map(
	(d) => d.data.data.result[0].metric.__name__,
);
const { metrics: metricsMap, uids } = mapMetricData(data);

let csvData: CsvRow[] = uids.map((id) => {
	let row: CsvRow = {
		pod: "",
		uid: "",
	};

	metricsName.forEach((key) => {
		const { pod, uid, value } = metricsMap[key][id];
		row = {
			...row,
			pod,
			uid,
			[key]: value,
		};
	});

	return row;
});
csvData = csvData.map((d) => ({
	...d,
	start_time_difference: calculateTimeDifference(
		new Date(d["kube_pod_start_time"]),
		new Date(d["kube_pod_container_state_started"]),
	).duration,
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csvFile = new CsvFile({
	path: path.resolve(__dirname, "result.tmp.csv"),
	headers: ["uid", "uid", ...metricsName, "start_time_difference"],
});

try {
	await csvFile.create(csvData);
	const content = await csvFile.read();

	console.log({ content });
} catch (error) {
	console.error(error.stack);
	process.exit(1);
}
