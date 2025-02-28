import { Metric, onCLS, onFID, onLCP, onTTFB, onFCP } from "web-vitals";

const reportWebVitals = () => {
    const reportHandler = (metric: Metric) => {
        return metric;
    };

    onCLS(reportHandler);
    onFID(reportHandler);
    onFCP(reportHandler);
    onLCP(reportHandler);
    onTTFB(reportHandler);
};

export default reportWebVitals;
