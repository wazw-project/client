import { render, unmountComponentAtNode } from "react-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Systems from "./systems";
import { createMemoryHistory } from "history";
import { AnyRecord } from "dns";
import { History } from 'history';

describe("<Systems />", () => {
    let container:any = null;
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });
    test("Should render system correctly with details", () => {
         const system =
        {
            _id: "62f834aae04fc9cb513b8a2c",
            topic: "Wheelchairs",
            objectName: "Wheelchair",
            managerUid: "62f833c8e04fc9cb513b8a22",
            description: "here you can rent Wheelchair",
            email: "naama@gmail.com",
            phone: "0556772275",
            urlName: "Wheelchair",
            urlImage: "https://www.animatedimages.org/data/media/1655/animated-wheelchair-image-0017.gif",
            __v: 0

        }
        const history: History = createMemoryHistory();
        const state:any = { id: "62f833c8e04fc9cb513b8a22" }
        history.push("/", state);
        render(<BrowserRouter>
            <Routes>
                <Route path="*" element={<Systems />} />
            </Routes>
        </BrowserRouter>, container);

        expect(container.textContent).toContain(system.email);
        expect(container.textContent).toContain("All systems");
        expect(container.textContent).toContain("add system");
        
    });
});



