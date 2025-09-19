describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {

    cy.visit('./src/index.html')

  })

  
  it('verifica o título da aplicação', () => {
 
  
    cy.title().should('be.equal', "Central de Atendimento ao Cliente TAT")
  
  })

  it('Preencher os campos obrigatorios e enviar o formulario', () => {

    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvxyz', 10)
    cy.get('#firstName').type('Amanda')
    cy.get('#lastName').type('Araujo')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type(longText, { delay:0 })
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')

  })

   it ('Exibir mensagem  de erro ao submenter o formulario com um email com formatação invalida', () => 
   {
  
  const longText = Cypress._.repeat('abcdefghijklmnopqrstuvxyz', 10)
    cy.get('#firstName').type('Amanda')
    cy.get('#lastName').type('Araujo')
    cy.get('#email').type('teste@teste,com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  
   })

   it('Campo telefone continua vazio quando preenchido um valor nao numerico', () => 
    {
   
       
     cy.get('#phone')
       .type('abc')
       .should('have.value', '')
   
    
   
    })

    it('Exibir mensagem de erro quando o telefone se torna obrigatorio mas não é preenchido antes do envio do formulario', () => 
      {
     
         
        cy.get('#firstName').type('Amanda')
        cy.get('#lastName').type('Araujo')
        cy.get('#email').type('teste@teste,com')
        cy.get('#open-text-area').type('teste')
        cy.get('#phone-checkbox').check()
cy.contains('button', 'Enviar').click()    
        cy.get('.error').should('be.visible')
     
         
      })

      it ('Preencher e limpar os campos nome, sobrenome, email e telefone', () => 
        {
                  
          cy.get('#firstName')
            .type('Amanda')
            .should('have.value', 'Amanda')
            .clear()
            .should('have.value', '')

            cy.get('#lastName')
              .type('Araujo')
              .clear()
              .should('have.value', '')


            cy.get('#email')
              .type('teste@teste,com')
              .clear()
              .should('have.value', '')

              cy.get('#phone')
              .type('123456')
              .clear()
              .should('have.value', '')

            cy.get('#open-text-area')
              .type('teste')
              .clear()
              .should('have.value', '')
               
           
        })

        it ('Exibir mensagem de erro ao submeter o formulario sem preencher os campos obrigatorios', () => 
          {
                    
                            
        cy.contains('button', 'Enviar').click()    
                 cy.get('.error').should('be.visible')
             
          })

          it('Enviar formulario com sucesso usando um comando customizado', () => 
            { 
             
                      
                   cy.fillMandatoryFieldsAndSubmit()

                   cy.get('.success').should('be.visible')
               
            })


            it ('Selecionar um produto (youtube) por seu texto', () => 
              { 
               
                     cy.get('#product') 
                       .select('YouTube')
                       .should('have.value', 'youtube')
                 
              })

              it('seleciona um produto (mentoria) por seu valor (value)', () => 
                { 
                 
                       cy.get('#product') 
                         .select('mentoria')
                         .should('have.value', 'mentoria')
                   
                })

                it ('seleciona um produto (Blog) por seu indice', () => 
                  { 
                   
                         cy.get('#product') 
                           .select(1)
                           .should('have.value', 'blog')
                     
                  })

                      
                                  
                 it('Selecionar de forma aleatoria com apenas uma tentativa', () => {
                        
                        cy.get('#product')
                          .its(length).then( n => {
  
                            cy.get('select').select(Cypress._.random(0,4))}
  
                          )})

                        
                 describe('Selecionar de forma aleatoria varias tentativa', () => {

                    Cypress._.times(5,() => {
                  
                          it('Selecionar de forma aleatoria', () => {
                        
                          cy.get('#product')
                            .its(length).then( n => {
                                      
                            cy.get('select').select(Cypress._.random(0,4))
                                                
                          
                          
                          }
          
                                  )})
                  
                                          })                                   
                                    })
                                                                  
                describe('Selecionar com a opção desabilitada de forma aleatoria', () => {

                    Cypress._.times(5,() => {
          
                        it('Selecionar de forma aleatoria s opção nao considerando o desabilitado', () => {
                                
                          cy.get('#product')
                            .not("[disabled]")
                            .its('length').then( n => {
          
                          cy.get('select').select(Cypress._.random(1,n))
                                          
                        }
          
                                  )})
          
          
                            })
          
          
                            })

                

                    it('marcar tipo de atendimento "Feedback"', () => {

                   cy.get('input[type="radio"][value="feedback"]').check()
                    .should('be.checked')
                     

                    }) 


                    it('marca cada tipo de atendimento, forma 1 ', () => {

                   cy.get('input[type="radio"][value="ajuda"]').check() 
                   .should('be.checked' )
                   cy.wait(500) 
                   cy.get('input[type="radio"][value="elogio"]').check()
                   .should('be.checked')
                   cy.wait(500)  
                   cy.get('input[type="radio"][value="feedback"]').check()
                   .should('be.checked')
                   cy.wait(500)
                                      
                     
                    })


                     it('marca cada tipo de atendimento, forma 2 ', () => {

                   cy.get('input[type="radio"]')
                   .each(typeOfService  => {
                      cy.wrap(typeOfService)
                        .check()
                        .should('be.checked')

                   })                                   
                   
                    })

                                      

                   it('Marcar ambos checkboxes, depois desmarca o ultimo, forma 2 walmir aula', () => {
                      cy.get('input[type="checkbox"]')
                        .check()
                        .should('be.checked')
                        .last()
                        .uncheck()
                        .should('not.be.checked')
                   })  

                        
                   it('Seleciona um arquivo da pasta fixures', () => {
                      cy.get('#file-upload')
                        .selectFile('cypress/fixtures/example.json')
                        .should(input => {
                            expect(input[0].files[0].name).to.equal('example.json')
                         })
                        
                   })
                   
                   it('Selecionar um arquivo simulando Drag-and-drop', () => {
                     
                     cy.get('#file-upload')
                     .selectFile('cypress/fixtures/example.json', { action:'drag-drop' })
                     .should(input => {
                            expect(input[0].files[0].name).to.equal('example.json')
                         })

                   })

                   it('Selecionar um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
                    cy.fixture('example.json').as('sampleFile')
                    cy.get('#file-upload')
                     .selectFile('@sampleFile') 
                     .should(input => {
                            expect(input[0].files[0].name).to.equal('example.json')
                         })                    

                  })

                  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
                      cy.contains('a', 'Política de Privacidade')
                        .should('have.attr', 'href', 'privacy.html')
                        .and('have.attr', 'target', '_blank')

                                      })
                  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => 
                  {

                      cy.contains('a', 'Política de Privacidade')
                      .invoke('removeAttr', 'target')
                      .click()


                      cy.contains('h1','CAC TAT - Política de Privacidade')

                  })

                  it('Testa pagina da politica de privacidade de forma independente', () => {



                  })
 

                })
            

                   
                



              
              
             