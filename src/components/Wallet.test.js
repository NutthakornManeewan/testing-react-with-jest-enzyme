import React from "react";
import { Wallet } from "./Wallet";
import { shallow } from "enzyme";

describe("Wallet", () => {
  const mockDeposit = jest.fn(),
    mockWithdraw = jest.fn();
  const props = { balance: 20, deposit: mockDeposit, withdraw: mockWithdraw };
  const wallet = shallow(<Wallet {...props} />);

  it("renders properly", () => {
    expect(wallet).toMatchSnapshot();
  });

  it("displays the balance from props", () => {
    expect(wallet.find(".balance").text()).toEqual("Wallet balance: 20");
  });

  it("creates an input into the deposit or withdraw form", () => {
    expect(wallet.find(".input-wallet").exists()).toBe(true);
  });

  describe("when user type into the wallet input", () => {
    const userBalance = "25";
    beforeEach(() => {
      wallet
        .find(".input-wallet")
        .simulate("change", { target: { value: userBalance } });
    });

    it("updates the local balance in `state` and converts it to a number", () => {
      expect(wallet.state().balance).toEqual(parseInt(userBalance, 10));
    });

    describe("user wants to make a deposit", () => {
      beforeEach(() => wallet.find(".btn-deposit").simulate("click"));
      it("dispatches the `deposit()` it receives from props with the local balance", () => {
        expect(mockDeposit).toHaveBeenCalledWith(parseInt(userBalance, 10));
      });
    });

    describe("user wants to make a withdraw", () => {
      beforeEach(() => wallet.find(".btn-withdraw").simulate("click"));
      it("dispatches the `withdraw()` it receives from props with local balance", () => {
        expect(mockWithdraw).toHaveBeenCalledWith(parseInt(userBalance, 10));
      });
    });
  });
});
