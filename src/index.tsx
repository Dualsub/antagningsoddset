import { createRoot } from "react-dom/client";
import { App } from "./App";
import ReactGA from 'react-ga4';

const TRACKING_ID = "G-PVS3GCJ21G"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

const container = document.getElementById("app");
const root = createRoot(container)
root.render(<App />);