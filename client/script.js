document.getElementById('signupForm').addEventListener('submit', async (e) => {
                              e.preventDefault();
                            
                              const name = document.getElementById('name').value.trim();
                              const email = document.getElementById('email').value.trim();
                              const password = document.getElementById('password').value.trim();
                            
                              const messageBox = document.getElementById('message');
                            
                              try {
                                const res = await fetch('https://singup-1.onrender.com/', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify({ name, email, password })
                                });
                            
                                const data = await res.json();
                            
                                if (res.ok) {
                                  messageBox.style.color = 'green';
                                  messageBox.innerText = 'Signup successful!';
                                  document.getElementById('signupForm').reset();
                                } else {
                                  messageBox.style.color = 'red';
                                  messageBox.innerText = data.message || 'Signup failed!';
                                }
                              } catch (err) {
                                messageBox.style.color = 'red';
                                messageBox.innerText = 'Error connecting to server!';
                                console.error(err);
                              }
                            });
                            
