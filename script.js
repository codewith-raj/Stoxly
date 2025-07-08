// Animate XP bar on load
window.addEventListener('DOMContentLoaded', () => {
  const xpFill = document.getElementById('xpFill');
  const userLevel = document.getElementById('userLevel');
  if (xpFill) {
    // Animate to a random XP percent between 60% and 95%
    const xpPercent = Math.floor(Math.random() * 35) + 60;
    setTimeout(() => {
      xpFill.style.width = xpPercent + '%';
    }, 400);
    // Optionally, update level based on XP (for demo)
    if (userLevel) {
      userLevel.textContent = xpPercent > 85 ? '8' : xpPercent > 70 ? '7' : '6';
    }
  }

  // Expand/collapse module cards
  const moduleCards = document.querySelectorAll('.module-card');
  if (moduleCards.length > 0) {
    moduleCards.forEach(card => {
      card.addEventListener('click', () => {
        try {
          card.classList.toggle('expanded');
          if (card.classList.contains('expanded')) {
            card.style.maxHeight = '600px';
            card.style.background = '#e6fffa';
          } else {
            card.style.maxHeight = '';
            card.style.background = '';
          }
        } catch (error) {
          console.error('Error in module card expansion:', error);
        }
      });
    });
  }

  // Highlight current page
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    if (window.location.pathname.endsWith(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });

  // Smooth mobile menu transitions
  const hamburger = document.getElementById('hamburger');
  const navLinksList = document.getElementById('navLinks');
  if (hamburger && navLinksList) {
    hamburger.addEventListener('click', () => {
      navLinksList.classList.toggle('open');
      navLinksList.style.transition = 'all 0.3s cubic-bezier(.4,2,.6,1)';
    });
    navLinksList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksList.classList.remove('open');
      });
    });
  }

  // News carousel
  const newsBites = Array.from(document.querySelectorAll('.news-bite'));
  let newsIndex = 0;
  function showNews(idx) {
    newsBites.forEach((bite, i) => {
      bite.classList.toggle('active', i === idx);
    });
  }
  showNews(newsIndex);
  const prevNewsBtn = document.getElementById('prevNews');
  const nextNewsBtn = document.getElementById('nextNews');
  if (prevNewsBtn) {
    prevNewsBtn.onclick = () => {
      newsIndex = (newsIndex - 1 + newsBites.length) % newsBites.length;
      showNews(newsIndex);
    };
  }
  if (nextNewsBtn) {
    nextNewsBtn.onclick = () => {
      newsIndex = (newsIndex + 1) % newsBites.length;
      showNews(newsIndex);
    };
  }

  // Leaderboard shuffle animation
  const leaderboardTable = document.getElementById('leaderboardTable');
  const shuffleBtn = document.getElementById('shuffleLeaderboard');
  if (leaderboardTable && shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      try {
        const tbody = leaderboardTable.querySelector('tbody');
        if (!tbody) return;
        
        const rows = Array.from(tbody.querySelectorAll('tr'));
        if (rows.length === 0) return;
        
        // Keep 'You' row in place
        const youRow = rows.find(row => row.classList.contains('you-row'));
        const otherRows = rows.filter(row => !row.classList.contains('you-row'));
        
        // Fisher-Yates shuffle
        for (let i = otherRows.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          if (otherRows[j] && otherRows[i] && otherRows[j].parentNode === tbody && otherRows[i].parentNode === tbody) {
            tbody.insertBefore(otherRows[j], otherRows[i]);
            [otherRows[i], otherRows[j]] = [otherRows[j], otherRows[i]];
          }
        }
        
        // Re-insert 'You' row at its original index (for demo, keep at 5th)
        if (youRow && tbody.children.length >= 4) {
          tbody.insertBefore(youRow, tbody.children[4] || null);
        }
        
        // Animate color for top 3
        Array.from(tbody.children).forEach((row, idx) => {
          row.classList.remove('rank-1', 'rank-2', 'rank-3');
          if (idx === 0) row.classList.add('rank-1');
          else if (idx === 1) row.classList.add('rank-2');
          else if (idx === 2) row.classList.add('rank-3');
        });
      } catch (error) {
        console.error('Error in leaderboard shuffle:', error);
      }
    });
  }

  // LEARN PAGE INTERACTIVITY
  if (window.location.pathname.endsWith('learn.html')) {
    // Quiz modal
    const quizModal = document.getElementById('quizModal');
    const openQuiz = document.getElementById('openQuiz');
    const closeQuiz = document.getElementById('closeQuiz');
    const quizForm = document.getElementById('quizForm');
    const quizFeedback = document.getElementById('quizFeedback');
    if (openQuiz && quizModal) {
      openQuiz.addEventListener('click', (e) => {
        e.stopPropagation();
        quizModal.classList.add('active');
      });
    }
    if (closeQuiz && quizModal) {
      closeQuiz.addEventListener('click', () => quizModal.classList.remove('active'));
    }
    window.addEventListener('click', (e) => {
      if (e.target === quizModal) quizModal.classList.remove('active');
    });
    if (quizForm && quizFeedback) {
      quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const answer = quizForm.quiz.value;
        if (answer === 'b') {
          quizFeedback.textContent = '✅ Correct! A bull market is when prices are rising.';
          quizFeedback.style.color = '#38b2ac';
        } else {
          quizFeedback.textContent = '❌ Oops! Try again. Hint: Bulls push prices up!';
          quizFeedback.style.color = '#e53e3e';
        }
      });
    }
    // Course modal
    const courseModal = document.getElementById('courseModal');
    const openCourse = document.getElementById('openCourse');
    const closeCourse = document.getElementById('closeCourse');
    if (openCourse && courseModal) {
      openCourse.addEventListener('click', (e) => {
        e.stopPropagation();
        courseModal.classList.add('active');
      });
    }
    if (closeCourse && courseModal) {
      closeCourse.addEventListener('click', () => courseModal.classList.remove('active'));
    }
    window.addEventListener('click', (e) => {
      if (e.target === courseModal) courseModal.classList.remove('active');
    });
    // Glossary toggle
    const toggleGlossary = document.getElementById('toggleGlossary');
    const glossarySection = document.getElementById('glossarySection');
    if (toggleGlossary && glossarySection) {
      toggleGlossary.addEventListener('click', () => {
        if (glossarySection.style.display === 'none' || !glossarySection.style.display) {
          glossarySection.style.display = 'block';
          toggleGlossary.textContent = 'Hide Glossary';
        } else {
          glossarySection.style.display = 'none';
          toggleGlossary.textContent = 'Show Glossary';
        }
      });
    }
  }

  // Social feed voting
  const posts = document.querySelectorAll('.post');
  if (posts.length > 0) {
    posts.forEach((post, idx) => {
      try {
        const bullishBtn = post.querySelector('.vote-btn[data-vote="bullish"]');
        const bearishBtn = post.querySelector('.vote-btn[data-vote="bearish"]');
        const bullishCount = post.querySelector('.vote-count#bullish' + (idx+1));
        const bearishCount = post.querySelector('.vote-count#bearish' + (idx+1));
        
        if (bullishBtn && bearishBtn && bullishCount && bearishCount) {
          bullishBtn.addEventListener('click', () => {
            bullishBtn.classList.add('selected');
            bearishBtn.classList.remove('selected');
            bullishCount.textContent = parseInt(bullishCount.textContent || '0') + 1;
            bullishBtn.classList.add('vote-animate');
            setTimeout(() => bullishBtn.classList.remove('vote-animate'), 300);
          });
          
          bearishBtn.addEventListener('click', () => {
            bearishBtn.classList.add('selected');
            bullishBtn.classList.remove('selected');
            bearishCount.textContent = parseInt(bearishCount.textContent || '0') + 1;
            bearishBtn.classList.add('vote-animate');
            setTimeout(() => bearishBtn.classList.remove('vote-animate'), 300);
          });
        }
      } catch (error) {
        console.error('Error in social feed voting setup:', error);
      }
    });
  }

  // Section fade-in on scroll
  const fadeSections = document.querySelectorAll('section, .profile-section, .ai-mentor-section, .battle-arena-section, .chart-section, .monetization-section');
  if (fadeSections.length > 0) {
    const fadeInOnScroll = () => {
      try {
        fadeSections.forEach(sec => {
          if (sec) {
            const rect = sec.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
              sec.classList.add('fade-in');
            }
          }
        });
      } catch (error) {
        console.error('Error in fade-in effect:', error);
      }
    };
    window.addEventListener('scroll', fadeInOnScroll);
    // Initial call to show sections that are already in viewport
    setTimeout(fadeInOnScroll, 100);
  }

  // Improved button/card hover (add ripple effect)
  const rippleElements = document.querySelectorAll('button, .module-card, .ai-mentor-card, .battle-card, .monetization-card');
  if (rippleElements.length > 0) {
    rippleElements.forEach(el => {
      el.addEventListener('mousedown', function(e) {
        try {
          let ripple = document.createElement('span');
          ripple.className = 'ripple';
          ripple.style.left = e.offsetX + 'px';
          ripple.style.top = e.offsetY + 'px';
          this.appendChild(ripple);
          setTimeout(() => {
            if (ripple && ripple.parentNode === this) {
              ripple.remove();
            }
          }, 600);
        } catch (error) {
          console.error('Error in ripple effect:', error);
        }
      });
    });
  }

  // Modals close on Esc
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      try {
        const modals = document.querySelectorAll('.modal, .quiz-modal');
        if (modals.length > 0) {
          modals.forEach(modal => {
            if (modal) {
              modal.classList.remove('active');
            }
          });
        }
      } catch (error) {
        console.error('Error in modal escape key handling:', error);
      }
    }
  });

  // Back to top button
  const backToTopBtn = document.querySelector('.back-to-top') || document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      try {
        if (window.scrollY > 300) {
          if (backToTopBtn.classList) {
            backToTopBtn.classList.add('visible');
          } else {
            backToTopBtn.style.display = 'block';
          }
        } else {
          if (backToTopBtn.classList) {
            backToTopBtn.classList.remove('visible');
          } else {
            backToTopBtn.style.display = 'none';
          }
        }
      } catch (error) {
        console.error('Error in back-to-top scroll handling:', error);
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error('Error in back-to-top click handling:', error);
      }
    });
  }

  // TRADE PAGE INTERACTIVITY
  if (window.location.pathname.endsWith('trade.html')) {
    // Portfolio add/remove
    const portfolioTable = document.getElementById('portfolioTable');
    const addStockForm = document.getElementById('addStockForm');
    if (portfolioTable && addStockForm) {
      addStockForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('stockName').value.trim().toUpperCase();
        const qty = parseInt(document.getElementById('stockQty').value);
        const price = parseInt(document.getElementById('stockPrice').value);
        if (!name || qty < 1 || price < 1) return;
        const value = qty * price;
        const row = document.createElement('tr');
        row.innerHTML = `<td>${name}</td><td>${qty}</td><td>₹${price}</td><td>₹${value.toLocaleString()}</td><td><button class='remove-stock'>Remove</button></td>`;
        portfolioTable.querySelector('tbody').appendChild(row);
        addStockForm.reset();
      });
      portfolioTable.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-stock')) {
          e.target.closest('tr').remove();
        }
      });
    }
    
    // Portfolio management
    const portfolioActions = document.querySelectorAll('.portfolio-action');
    if (portfolioActions.length > 0) {
      portfolioActions.forEach(btn => {
        btn.addEventListener('click', function() {
          try {
            const action = this.dataset.action;
            const stockRow = this.closest('.stock-row');
            if (!stockRow) return;
            
            const stockNameElement = stockRow.querySelector('.stock-name');
            if (!stockNameElement) return;
            
            const stockName = stockNameElement.textContent;
            
            if (action === 'buy') {
              alert(`Buying more ${stockName}! (This would open a buy modal in the real app)`);
            } else if (action === 'sell') {
              alert(`Selling ${stockName}! (This would open a sell modal in the real app)`);
            } else if (action === 'remove') {
              stockRow.classList.add('removing');
              setTimeout(() => {
                if (stockRow.parentNode) {
                  stockRow.remove();
                }
              }, 300);
            }
          } catch (error) {
            console.error('Error in portfolio management:', error);
          }
        });
      });
    }
    // Chart timeframe switch
    const chartTimeframe = document.getElementById('chartTimeframe');
    const chartImg = document.getElementById('chartImg');
    if (chartTimeframe && chartImg) {
      chartTimeframe.addEventListener('change', () => {
        try {
          if (chartTimeframe.value === '1d') {
            chartImg.src = 'https://dummyimage.com/600x280/edf2f7/aaa&text=Stock+Chart+1D';
          } else if (chartTimeframe.value === '1w') {
            chartImg.src = 'https://dummyimage.com/600x280/edf2f7/aaa&text=Stock+Chart+1W';
          } else {
            chartImg.src = 'https://dummyimage.com/600x280/edf2f7/aaa&text=Stock+Chart+1M';
          }
        } catch (error) {
          console.error('Error in chart timeframe switch:', error);
        }
      });
    }
    // Leaderboard shuffle
    const leaderboardTable = document.getElementById('leaderboardTable');
    const shuffleBtn = document.getElementById('shuffleLeaderboard');
    if (leaderboardTable && shuffleBtn) {
      shuffleBtn.addEventListener('click', () => {
        try {
          const tbody = leaderboardTable.querySelector('tbody');
          if (!tbody) return;
          
          const rows = Array.from(tbody.querySelectorAll('tr'));
          if (rows.length === 0) return;
          
          const youRow = rows.find(row => row.classList.contains('you-row'));
          const otherRows = rows.filter(row => !row.classList.contains('you-row'));
          
          for (let i = otherRows.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            if (otherRows[j] && otherRows[i] && otherRows[j].parentNode && otherRows[i].parentNode) {
              tbody.insertBefore(otherRows[j], otherRows[i]);
              [otherRows[i], otherRows[j]] = [otherRows[j], otherRows[i]];
            }
          }
          
          if (youRow && tbody.children.length >= 5) {
            tbody.insertBefore(youRow, tbody.children[4]);
          }
          
          Array.from(tbody.children).forEach((row, idx) => {
            row.classList.remove('rank-1', 'rank-2', 'rank-3');
            if (idx === 0) row.classList.add('rank-1');
            else if (idx === 1) row.classList.add('rank-2');
            else if (idx === 2) row.classList.add('rank-3');
          });
        } catch (error) {
          console.error('Error in leaderboard shuffle:', error);
        }
      });
    }
  }

  // AI MENTOR PAGE INTERACTIVITY
  if (window.location.pathname.endsWith('ai.html')) {
    // Expand/collapse AI Mentor cards
    const aiMentorCards = document.querySelectorAll('.ai-mentor-card');
    if (aiMentorCards.length > 0) {
      aiMentorCards.forEach(card => {
        card.addEventListener('click', function () {
          try {
            document.querySelectorAll('.ai-mentor-card').forEach(c => {
              if (c !== card) c.classList.remove('expanded');
            });
            
            card.classList.toggle('expanded');
            let info = card.getAttribute('data-info');
            
            if (card.classList.contains('expanded') && info) {
              if (!card.querySelector('.ai-more-info')) {
                let more = document.createElement('div');
                more.className = 'ai-more-info';
                more.textContent = info;
                card.appendChild(more);
              }
            } else {
              let more = card.querySelector('.ai-more-info');
              if (more) more.remove();
            }
          } catch (error) {
            console.error('Error in AI mentor card expansion:', error);
          }
        });
        
        card.addEventListener('blur', function () {
          try {
            card.classList.remove('expanded');
            let more = card.querySelector('.ai-more-info');
            if (more) more.remove();
          } catch (error) {
            console.error('Error in AI mentor card blur:', error);
          }
        });
      });
    }
    // What If? Simulator
    const whatIfForm = document.getElementById('whatIfForm');
    const whatIfResult = document.getElementById('whatIfResult');
    if (whatIfForm && whatIfResult) {
      whatIfForm.addEventListener('submit', (e) => {
        try {
          e.preventDefault();
          
          const stockInput = document.getElementById('whatIfStock');
          const dateInput = document.getElementById('whatIfDate');
          
          if (!stockInput || !dateInput) return;
          
          const stock = stockInput.value.trim().toUpperCase();
          const date = dateInput.value;
          
          if (!stock || !date) return;
          
          // Fake random result
          const gain = Math.random() > 0.5;
          const percent = (Math.random() * 20 + 1).toFixed(2);
          whatIfResult.textContent = gain ? 
            `You would have gained +${percent}% on ${stock} since ${date}! 🎉` : 
            `You would have lost -${percent}% on ${stock} since ${date}. 😬`;
          whatIfResult.style.color = gain ? '#38b2ac' : '#e53e3e';
        } catch (error) {
          console.error('Error in What If Simulator:', error);
          whatIfResult.textContent = 'An error occurred. Please try again.';
          whatIfResult.style.color = '#e53e3e';
        }
      });
    }
  }

  // SOCIAL PAGE INTERACTIVITY
  if (window.location.pathname.endsWith('social.html')) {
    // Clubs expand/collapse
    const clubCards = document.querySelectorAll('.club-card');
    if (clubCards.length > 0) {
      clubCards.forEach(card => {
        try {
          const btn = card.querySelector('.toggle-club');
          const details = card.querySelector('.club-details');
          
          if (!btn || !details) return;
          
          btn.addEventListener('click', () => {
            try {
              if (details.style.display === 'none' || !details.style.display) {
                details.style.display = 'block';
                btn.textContent = 'Hide Details';
              } else {
                details.style.display = 'none';
                btn.textContent = 'Show Details';
              }
            } catch (error) {
              console.error('Error in club toggle click:', error);
            }
          });
          
          card.addEventListener('blur', () => {
            try {
              details.style.display = 'none';
              btn.textContent = 'Show Details';
            } catch (error) {
              console.error('Error in club card blur:', error);
            }
          });
        } catch (error) {
          console.error('Error setting up club card:', error);
        }
      });
    }
    // Ask Mentor chat
    const mentorForm = document.getElementById('mentorForm');
    const mentorInput = document.getElementById('mentorInput');
    const mentorResponse = document.getElementById('mentorResponse');
    if (mentorForm && mentorInput && mentorResponse) {
      mentorForm.addEventListener('submit', (e) => {
        try {
          e.preventDefault();
          
          const q = mentorInput.value.trim();
          if (!q) return;
          
          // Canned AI response
          let response = '';
          if (q.toLowerCase().includes('stock')) {
            response = 'Start by learning the basics, set your goals, and use Stoxly's virtual market to practice!';
          } else if (q.toLowerCase().includes('risk')) {
            response = 'Diversify your portfolio and never invest more than you can afford to lose.';
          } else if (q.toLowerCase().includes('ipo')) {
            response = 'An IPO is when a company first offers shares to the public. Research before investing!';
          } else {
            response = 'Great question! Our mentors will get back to you soon.';
          }
          
          // Safely create HTML content
          const userMsgDiv = document.createElement('div');
          userMsgDiv.className = 'mentor-msg user-msg';
          userMsgDiv.textContent = q;
          
          const aiMsgDiv = document.createElement('div');
          aiMsgDiv.className = 'mentor-msg ai-msg';
          aiMsgDiv.textContent = response;
          
          // Clear previous responses
          mentorResponse.innerHTML = '';
          
          // Append new messages
          mentorResponse.appendChild(userMsgDiv);
          mentorResponse.appendChild(aiMsgDiv);
          
          // Clear input
          mentorInput.value = '';
        } catch (error) {
          console.error('Error in Ask Mentor chat:', error);
        }
      });
    }
  }

  // PROFILE PAGE INTERACTIVITY
  if (window.location.pathname.endsWith('profile.html')) {
    try {
      // Edit Profile modal
      const editProfileModal = document.getElementById('editProfileModal');
      const openEditProfile = document.getElementById('openEditProfile');
      const closeEditProfile = document.getElementById('closeEditProfile');
      const editProfileForm = document.getElementById('editProfileForm');
      // Profile fields
      const profileName = document.getElementById('profileName');
      const profileUsername = document.getElementById('profileUsername');
      const profileBio = document.getElementById('profileBio');
      const profileLocation = document.getElementById('profileLocation');
      const profileFavStocks = document.getElementById('profileFavStocks');
      const profileTwitter = document.getElementById('profileTwitter');
      const profileLinkedIn = document.getElementById('profileLinkedIn');
      const profileAvatar = document.getElementById('profileAvatar');
      const avatarInput = document.getElementById('avatarInput');
      const changeAvatarBtn = document.getElementById('changeAvatarBtn');
      // Extra fields
      const profileXP = document.getElementById('profileXP');
      const profileLevel = document.getElementById('profileLevel');
      const profileJoinDate = document.getElementById('profileJoinDate');
      // Modal open/close
      if (openEditProfile && editProfileModal) {
        openEditProfile.addEventListener('click', (e) => {
          e.stopPropagation();
          editProfileModal.classList.add('active');
        });
      }
      if (closeEditProfile && editProfileModal) {
        closeEditProfile.addEventListener('click', () => editProfileModal.classList.remove('active'));
      }
      if (editProfileModal) {
        window.addEventListener('click', (e) => {
          if (e.target === editProfileModal) editProfileModal.classList.remove('active');
        });
      }
      // Save profile changes
      if (editProfileForm) {
        editProfileForm.addEventListener('submit', function(e) {
          e.preventDefault();
          profileName.textContent = document.getElementById('editName').value;
          profileUsername.textContent = '@' + document.getElementById('editUsername').value;
          profileBio.innerHTML = '<strong>Bio:</strong> ' + document.getElementById('editBio').value;
          profileLocation.innerHTML = '<strong>Location:</strong> ' + document.getElementById('editLocation').value;
          profileFavStocks.innerHTML = '<strong>Favorite Stocks:</strong> ' + document.getElementById('editFavStocks').value;
          profileTwitter.href = document.getElementById('editTwitter').value;
          profileLinkedIn.href = document.getElementById('editLinkedIn').value;
          profileTwitter.textContent = '🐦 Twitter';
          profileLinkedIn.textContent = '💼 LinkedIn';
          // Optionally update XP/Level (demo)
          // profileXP.textContent = ...
          // profileLevel.textContent = ...
          editProfileModal.classList.remove('active');
        });
      }
      // Avatar change
      if (changeAvatarBtn && avatarInput && profileAvatar) {
        changeAvatarBtn.addEventListener('click', () => avatarInput.click());
        avatarInput.addEventListener('change', function() {
          if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
              profileAvatar.src = e.target.result;
            };
            reader.readAsDataURL(this.files[0]);
          }
        });
      }
      // Optionally: Add new recent activity (demo)
      // const recentActivityList = document.getElementById('recentActivityList');
      // if (recentActivityList) {
      //   const addActivityBtn = document.createElement('button');
      //   addActivityBtn.textContent = 'Add Demo Activity';
      //   addActivityBtn.onclick = () => {
      //     const li = document.createElement('li');
      //     li.textContent = '⭐ Demo activity at ' + new Date().toLocaleTimeString();
      //     recentActivityList.prepend(li);
      //   };
      //   recentActivityList.parentNode.insertBefore(addActivityBtn, recentActivityList);
      // }
    } catch (error) {
      console.error('Error setting up profile page interactivity:', error);
    }
  }

  // --- DEMO DATA GENERATION START ---
  // 1. Add more module cards
  const moduleContainer = document.querySelector('.modules-list');
  if (moduleContainer) {
    for (let i = 4; i <= 8; i++) {
      const card = document.createElement('div');
      card.className = 'module-card';
      card.innerHTML = `<h3>Module ${i}</h3><p>Demo content for module ${i}.</p>`;
      moduleContainer.appendChild(card);
    }
  }

  // 2. Add more news bites
  const newsCarousel = document.querySelector('.news-carousel');
  if (newsCarousel) {
    for (let i = 4; i <= 8; i++) {
      const bite = document.createElement('div');
      bite.className = 'news-bite';
      bite.innerHTML = `<strong>News Headline ${i}</strong><p>Sample news content for item ${i}.</p>`;
      newsCarousel.appendChild(bite);
    }
  }

  // 3. Add more leaderboard rows
  const leaderboardTableDemo = document.getElementById('leaderboardTable');
  if (leaderboardTableDemo) {
    const tbody = leaderboardTableDemo.querySelector('tbody');
    if (tbody) {
      for (let i = 6; i <= 15; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${i}</td><td>User${i}</td><td>${Math.floor(Math.random()*10000)}</td>`;
        tbody.appendChild(row);
      }
    }
  }

  // 4. Add more social posts
  const feed = document.querySelector('.feed-list');
  if (feed) {
    for (let i = 4; i <= 8; i++) {
      const post = document.createElement('div');
      post.className = 'post';
      post.innerHTML = `
        <div class="post-header">User${i} <span class="post-date">Today</span></div>
        <div class="post-content">Sample post content for user ${i}.</div>
        <div class="post-votes">
          <button class="vote-btn" data-vote="bullish">🐂</button>
          <span class="vote-count" id="bullish${i}">0</span>
          <button class="vote-btn" data-vote="bearish">🐻</button>
          <span class="vote-count" id="bearish${i}">0</span>
        </div>
      `;
      feed.appendChild(post);
    }
  }

  // 5. Add more portfolio stocks (trade.html)
  if (window.location.pathname.endsWith('trade.html')) {
    const portfolioTable = document.getElementById('portfolioTable');
    if (portfolioTable) {
      const tbody = portfolioTable.querySelector('tbody');
      if (tbody) {
        for (let i = 4; i <= 8; i++) {
          const name = `STOCK${i}`;
          const qty = Math.floor(Math.random()*50+1);
          const price = Math.floor(Math.random()*1000+100);
          const value = qty * price;
          const row = document.createElement('tr');
          row.innerHTML = `<td>${name}</td><td>${qty}</td><td>₹${price}</td><td>₹${value.toLocaleString()}</td><td><button class='remove-stock'>Remove</button></td>`;
          tbody.appendChild(row);
        }
      }
    }
  }

  // 6. Add more AI mentor cards (ai.html)
  if (window.location.pathname.endsWith('ai.html')) {
    const aiMentorList = document.querySelector('.ai-mentor-list');
    if (aiMentorList) {
      for (let i = 4; i <= 8; i++) {
        const card = document.createElement('div');
        card.className = 'ai-mentor-card';
        card.setAttribute('tabindex', '0');
        card.setAttribute('data-info', `Extra info for AI Mentor ${i}`);
        card.innerHTML = `<h3>AI Mentor ${i}</h3><p>Specialty: Demo ${i}</p>`;
        aiMentorList.appendChild(card);
      }
    }
  }

  // 7. Add more club cards (social.html)
  if (window.location.pathname.endsWith('social.html')) {
    const clubList = document.querySelector('.clubs-list');
    if (clubList) {
      for (let i = 4; i <= 8; i++) {
        const card = document.createElement('div');
        card.className = 'club-card';
        card.innerHTML = `
          <div class="club-header">Club ${i}</div>
          <button class="toggle-club">Show Details</button>
          <div class="club-details" style="display:none;">Details for Club ${i}.</div>
        `;
        clubList.appendChild(card);
      }
    }
  }
  // --- DEMO DATA GENERATION END ---
});