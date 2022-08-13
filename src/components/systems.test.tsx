import { render, unmountComponentAtNode } from "react-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Systems from "./systems";


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
        const system = {
            
                topic:"Wheelchairs",
               objectName:"Wheelchair",
                managerUid: "62f1fefd238a932105836927",
               description:"here you can rent Wheelchair",
               email:"naama@gmail.com",
               phone:"0556772275",
               urlName:"Wheelchair",
               urlImage:"https://www.animatedimages.org/data/media/1655/animated-wheelchair-image-0017.gif",
               _id: "62f3c1464502c41dcae300fb",
               __v: 0
            
        }

        render(<BrowserRouter>
            <Routes>
                <Route path="*" element={<Systems/>} />
            </Routes>
        </BrowserRouter>, container);
       
        expect(container.textContent).toContain(system.topic);
    });
});