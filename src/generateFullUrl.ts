import config from "./config";

const { BASE_URL } = config;

export function generateFullUrl(
	namespace: string,
	type: "kube_pod_container_state_started" | "kube_pod_start_time",
): string {
	return `${BASE_URL}/api/v1/query?query=${type}{namespace="${namespace}"}`;
}
