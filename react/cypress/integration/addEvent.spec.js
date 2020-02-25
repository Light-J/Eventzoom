const mockData = {
    title: 'demo title',
    description: 'this is a description for demo title from mock data',
    speaker: 'John',
    vagueLocation: 'New York',
    specificLocation: 'manhatton',
    organiser: 'Apple',
    capacity: '15'
}

describe('AddEvent', () => {
    it('should add event successfully when form is submited', () => {
        cy.visit('/#/AddEvent');
        cy.server();
        cy.route('POST', '/events/addEvent').as('postAddEvent');
        cy.get('[data-cy="addEvent-title"]')
            .type(mockData.title);
        cy.get('[data-cy="addEvent-description"]')
            .type(mockData.description);
        cy.get('[data-cy="addEvent-imageUpload"]').uploadFile('../fixtures/image-addEvent-fixture.jpg');
        cy.get('[data-cy="addEvent-speaker"]')
            .type(mockData.speaker);
        cy.get('[data-cy="addEvent-vaguelocation"]')
            .type(mockData.vagueLocation);
        cy.get('[data-cy="addEvent-specificlocation"]')
            .type(mockData.specificLocation);
        cy.get('[data-cy="addEvent-disabilityaccess-no"]')
            .check();
        cy.get('[data-cy="addEvent-organiser"]')
            .type(mockData.organiser);
        cy.get('[data-cy="addEvent-capacity"]')
            .type(mockData.capacity);
        cy.get('[data-cy="addEvent-submit-button"]').click();
        cy.wait('@postAddEvent');
        cy.get('@postAddEvent')
            .then(xhr => {
                console.log(xhr.request.body.data)
                expect(xhr.status).to.equal(200);
                expect(xhr.request.body.data).to.have.property('title', mockData.title)
                expect(xhr.request.body.data).to.have.property('description', mockData.description)
                expect(xhr.request.body.data).to.have.property('speaker', mockData.speaker)
                expect(xhr.request.body.data).to.have.property('vaguelocation', mockData.vagueLocation)
                expect(xhr.request.body.data).to.have.property('specificlocation', mockData.specificLocation)
                expect(xhr.request.body.data).to.have.property('disabilityaccess', 'no')
                expect(xhr.request.body.data).to.have.property('capacity', '0' + mockData.capacity)
                expect(xhr.response.body).to.have.property('title', mockData.title)
                expect(xhr.response.body).to.have.property('description', mockData.description)
                expect(xhr.response.body).to.have.property('speaker', mockData.speaker)
                expect(xhr.response.body).to.have.property('vaguelocation', mockData.vagueLocation)
                expect(xhr.response.body).to.have.property('specificlocation', mockData.specificLocation)
                expect(xhr.response.body).to.have.property('disabilityaccess', false)
                expect(xhr.response.body).to.have.property('organiser', mockData.organiser)
                expect(xhr.response.body).to.have.property('capacity', Number(mockData.capacity))
            });

    })
})