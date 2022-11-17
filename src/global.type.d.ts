export interface Metrics {
	[metricName: string]: Metric;
}

export interface Metric {
	[uid: string]: {
		uid: string;
		pod: string;
		value: number;
		metricName: string;
	};
}

interface CsvRow {
	uid: string;
	pod: string;
	[key: string]: number | string;
}
