import { render, unmountComponentAtNode } from "react-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from "history";
import SystemDetails from './SystemDetails'
describe("<SystemDetails/>", () => {
    let container: any = null;
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });



//     test("Should render system correctly with details", () => {
     
      
//        render(<BrowserRouter>
//            <Routes>
//                <Route path="*" element={<SystemDetails />} />
//            </Routes>
//        </BrowserRouter>, container);

//       // expect(container.textContent).toContain(system.email);
//        expect(container.textContent).toContain("All systems");
//        expect(container.textContent).toContain("add system");
       
//    });
})