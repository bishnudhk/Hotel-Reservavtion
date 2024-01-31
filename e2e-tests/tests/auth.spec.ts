// npm init playwright@latest

import { test, expect } from "@playwright/test";
// import { render, waitFor, getByRole, fireEvent } from "@testing-library/react";

// const UI_URL = "http://127.0.0.1:7000/";
// const UI_URL = "http://127.0.0.1:5173/";
const UI_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  //get the sign in button
  // await page.getByRole("link", { name: "SignIn" }).click();
  // Wait for the sign-in link to be present and clickable
  const signInLink = await page.waitForSelector('a:has-text("SignIn")');
  await signInLink.click();

  // await expect(page.getByRole("heading", { name: "SignIn" })).toBeVisible();
  // Wait for the heading to be visible
  await page.waitForSelector('h1:has-text("SignIn")', { state: "visible" });

  await page.locator("[name=email]").fill("dhk@123.com");
  await page.locator("[name=password]").fill("password123");

  // await page.getByRole("button", { name: "Login" });
  await page.getByRole("button", { name: "Login" }).click();

  // await expect(page.getByText("Sign in Successful!")).toBeVisible();
  await expect(page.getByText("Sign in Successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@test.com`;
  await page.goto(UI_URL);
  //   // Click the get started link.
  await page.getByRole("link", { name: "sign In" }).click();
  await page.getByRole("link", { name: "Create an account here" }).click();
  //   // Expects page to have a heading with the name of Installation.
  // await expect(
  //   page.getByRole("heading", { name: "Create an account here" })
  // ).toBeVisible();
  // Assuming there's a delay or animation after the element is present
  const headingElement = await page.waitForSelector(
    'h1:has-text("Create an account here")'
  );
  await page.waitForTimeout(2000); // Adjust the time based on your application's behavior
  await expect(headingElement).toBeVisible();

  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password123");
  await page.locator("[name=confirmPassword]").fill("password123");

  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Registration Successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
