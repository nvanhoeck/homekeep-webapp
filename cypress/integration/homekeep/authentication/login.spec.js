describe("homepage", () => {
  it("should redirect to the homepage", () => {
    cy.visit("http://localhost:4200/");
    cy.url().should('include', '/home');
  });
});
