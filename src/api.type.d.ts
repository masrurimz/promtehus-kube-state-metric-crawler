// Generated by https://quicktype.io

export interface KubePodContainerStateStartedAPIResponse {
	status: string;
	data: Data;
}

export interface Data {
	resultType: string;
	result: Result[];
}

export interface Result {
	metric: ResultMetric;
	value: Array<number | string>;
}

export interface ResultMetric {
	__name__: string;
	container: string;
	endpoint: string;
	instance: string;
	job: string;
	namespace: string;
	pod: string;
	service: string;
	uid: string;
}