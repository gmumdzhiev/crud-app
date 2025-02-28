import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { App } from './app/App'
import reportWebVitals from "./common/utils/reportWebVitals.ts";
import {Provider} from "react-redux";
import {store} from "./app/store/store";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);
reportWebVitals();