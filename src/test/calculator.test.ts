import { describe, expect, it } from "vitest";

import {
  CALC,
  SUBSIDY,
  calcResult,
  isIndianMobile,
  monthlyUnitsFrom,
  subsidyFor,
  waLink,
} from "@/config/site";

describe("monthlyUnitsFrom", () => {
  it("treats the entered bill as covering the TN bi-monthly billing period", () => {
    // ₹6,000 over 2 months at ₹7/unit ≈ 428.6 units/month
    expect(monthlyUnitsFrom("bill", 6000)).toBeCloseTo(6000 / CALC.billingMonths / CALC.tariffPerUnit);
    expect(monthlyUnitsFrom("units", 800)).toBe(400);
  });

  it("clamps negative and non-numeric input to zero", () => {
    expect(monthlyUnitsFrom("bill", -500)).toBe(0);
    expect(monthlyUnitsFrom("units", Number.NaN)).toBe(0);
  });
});

describe("calcResult", () => {
  it("picks the smallest listed size that covers consumption", () => {
    expect(calcResult(200).kw).toBe(2); // needs 1.67 kW
    expect(calcResult(300).kw).toBe(3); // needs 2.5 kW
    expect(calcResult(430).kw).toBe(4); // needs 3.58 kW — must not jump to 5 kW
    expect(calcResult(600).kw).toBe(5);
  });

  it("caps at the largest size and flags it with plus", () => {
    const r = calcResult(5000);
    expect(r.kw).toBe(10);
    expect(r.plus).toBe(true);
  });

  it("returns no payback (not 0 years) when there is nothing to save", () => {
    const r = calcResult(0);
    expect(r.payback).toBeNull();
    expect(r.monthlySave).toBe(0);
  });

  it("computes payback from net cost after subsidy", () => {
    const r = calcResult(300); // 3 kW, generates 360 > 300 used
    const net = 3 * CALC.costPerKw - subsidyFor(3);
    expect(r.payback).toBeCloseTo(net / (300 * CALC.tariffPerUnit * 12));
    expect(r.payback!).toBeGreaterThan(0);
  });
});

describe("subsidyFor", () => {
  it("follows the subsidy table and caps above 3 kW", () => {
    expect(subsidyFor(1)).toBe(SUBSIDY[0]!.central + SUBSIDY[0]!.state);
    expect(subsidyFor(2)).toBe(SUBSIDY[1]!.central + SUBSIDY[1]!.state);
    expect(subsidyFor(3)).toBe(SUBSIDY[2]!.central + SUBSIDY[2]!.state);
    expect(subsidyFor(10)).toBe(subsidyFor(4));
  });
});

describe("isIndianMobile", () => {
  it.each(["9876543210", "+91 98765 43210", "09876543210", "91-9876543210"])("accepts %s", (n) => {
    expect(isIndianMobile(n)).toBe(true);
  });
  it.each(["12345", "5876543210", "98765432101", "abc"])("rejects %s", (n) => {
    expect(isIndianMobile(n)).toBe(false);
  });
});

describe("waLink", () => {
  it("URL-encodes the prefilled message for wa.me", () => {
    const url = new URL(waLink("Hi Axsun\nBill: ₹6,000 & roof"));
    expect(url.origin + url.pathname).toBe("https://wa.me/918610744855");
    expect(url.searchParams.get("text")).toBe("Hi Axsun\nBill: ₹6,000 & roof");
  });
});
