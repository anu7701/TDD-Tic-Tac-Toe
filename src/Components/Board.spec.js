import React from "react";
import Board from "./Board";
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { fireEvent, getByTestId, within } from "@testing-library/react";
import {render } from "@testing-library/react";

configure({ adapter: new Adapter() });



describe("Basic rendering of Board",()=>{
    it("Should render three rows of squares board", ()=>{
        const board=shallow(<Board />);
        expect(board.find(".board-row")).toHaveLength(3);
    });
    it("should render 9 squares", ()=>
    {
        const board=render(<Board />);
        const boardId=board.getAllByTestId('board-row')
        const squ=board.getAllByRole('button')
        expect (squ).toHaveLength(9);
    });

})

describe("Testing square clicking functionality", ()=>{
    it("Should render cell value as X on first hit",()=>{
        const {getByTestId}=render(<Board />)
        fireEvent.click(getByTestId('square1'));
        expect(getByTestId('square1')).toHaveValue('X');
        
    })
    it("Should render cell value as O on second hit",()=>{
        const {getByTestId}=render(<Board />)
        fireEvent.click(getByTestId('square1'));
        fireEvent.click(getByTestId('square2'));
        expect(getByTestId('square2')).toHaveValue('O');
    })

})
describe("Testing for winner",()=>{
    it("Should render winner as X when player X wins",()=>{
        const{getByTestId}=render(<Board></Board>)
        //PlayerX
        fireEvent.click(getByTestId('square0'));
        //PlayerO
        fireEvent.click(getByTestId('square4'));
        //PlayerX
        fireEvent.click(getByTestId('square1'));
        //PlayerO
        fireEvent.click(getByTestId('square6'));
        //PlayerX
        fireEvent.click(getByTestId('square2'));
        
        expect(getByTestId('winner')).toHaveTextContent('Winner: X')
    })
    it("Should render winner as X when player O wins",()=>{
        const{getByTestId}=render(<Board></Board>)
        //PlayerX
        fireEvent.click(getByTestId('square4'));
        //PlayerO
        fireEvent.click(getByTestId('square1'));
        //PlayerX
        fireEvent.click(getByTestId('square5'));
        //PlayerO
        fireEvent.click(getByTestId('square0'));
        //PlayerX
        fireEvent.click(getByTestId('square8'));
        //PlayerO
        fireEvent.click(getByTestId('square2'));
        
        expect(getByTestId('winner')).toHaveTextContent('Winner: O')
    })
    it("Should render Tie when no one wins",()=>{
        const{getByTestId}=render(<Board></Board>)
        //PlayerX
        fireEvent.click(getByTestId('square0'));
        //PlayerO
        fireEvent.click(getByTestId('square1'));
        //PlayerX
        fireEvent.click(getByTestId('square2'));
        //PlayerO
        fireEvent.click(getByTestId('square4'));
        //PlayerX
        fireEvent.click(getByTestId('square3'));
        //PlayerO
        fireEvent.click(getByTestId('square8'));
        //PlayerX
        fireEvent.click(getByTestId('square5'));
        //PlayerO
        fireEvent.click(getByTestId('square6'));
        //PlayerX
        fireEvent.click(getByTestId('square7'));
        
        expect(getByTestId('winner')).toHaveTextContent('Tie Match')
    })
})

