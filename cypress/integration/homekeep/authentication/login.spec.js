describe("homepage", () => {
  it("should redirect to the homepage", () => {
    cy.visit("");
    cy.url().should('include', '/home');
  });
});
