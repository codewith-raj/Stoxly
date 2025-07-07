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
  document.querySelectorAll('.module-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('expanded');
      if (card.classList.contains('expanded')) {
        card.style.maxHeight = '600px';
        card.style.background = '#e6fffa';
      } else {
        card.style.maxHeight = '';
        card.style.background = '';
      }
    });
  });

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
  document.getElementById('prevNews').onclick = () => {
    newsIndex = (newsIndex - 1 + newsBites.length) % newsBites.length;
    showNews(newsIndex);
  };
  document.getElementById('nextNews').onclick = () => {
    newsIndex = (newsIndex + 1) % newsBites.length;
    showNews(newsIndex);
  };

  // Leaderboard shuffle animation
  const leaderboardTable = document.getElementById('leaderboardTable');
  const shuffleBtn = document.getElementById('shuffleLeaderboard');
  if (leaderboardTable && shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      const tbody = leaderboardTable.querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));
      // Keep 'You' row in place
      const youRow = rows.find(row => row.classList.contains('you-row'));
      const otherRows = rows.filter(row => !row.classList.contains('you-row'));
      // Fisher-Yates shuffle
      for (let i = otherRows.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        tbody.insertBefore(otherRows[j], otherRows[i]);
        [otherRows[i], otherRows[j]] = [otherRows[j], otherRows[i]];
      }
      // Re-insert 'You' row at its original index (for demo, keep at 5th)
      if (youRow) tbody.insertBefore(youRow, tbody.children[4]);
      // Animate color for top 3
      Array.from(tbody.children).forEach((row, idx) => {
        row.classList.remove('rank-1', 'rank-2', 'rank-3');
        if (idx === 0) row.classList.add('rank-1');
        else if (idx === 1) row.classList.add('rank-2');
        else if (idx === 2) row.classList.add('rank-3');
      });
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
  document.querySelectorAll('.post').forEach((post, idx) => {
    const bullishBtn = post.querySelector('.vote-btn[data-vote="bullish"]');
    const bearishBtn = post.querySelector('.vote-btn[data-vote="bearish"]');
    const bullishCount = post.querySelector('.vote-count#bullish' + (idx+1));
    const bearishCount = post.querySelector('.vote-count#bearish' + (idx+1));
    if (bullishBtn && bearishBtn && bullishCount && bearishCount) {
      bullishBtn.addEventListener('click', () => {
        bullishBtn.classList.add('selected');
        bearishBtn.classList.remove('selected');
        bullishCount.textContent = parseInt(bullishCount.textContent) + 1;
        bullishBtn.classList.add('vote-animate');
        setTimeout(() => bullishBtn.classList.remove('vote-animate'), 300);
      });
      bearishBtn.addEventListener('click', () => {
        bearishBtn.classList.add('selected');
        bullishBtn.classList.remove('selected');
        bearishCount.textContent = parseInt(bearishCount.textContent) + 1;
        bearishBtn.classList.add('vote-animate');
        setTimeout(() => bearishBtn.classList.remove('vote-animate'), 300);
      });
    }
  });

  // Section fade-in on scroll
  const fadeSections = document.querySelectorAll('section, .profile-section, .ai-mentor-section, .battle-arena-section, .chart-section, .monetization-section');
  const fadeInOnScroll = () => {
    fadeSections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        sec.classList.add('fade-in');
      }
    });
  };
  window.addEventListener('scroll', fadeInOnScroll);
  fadeInOnScroll();

  // Improved button/card hover (add ripple effect)
  document.querySelectorAll('button, .module-card, .ai-mentor-card, .battle-card, .monetization-card').forEach(el => {
    el.addEventListener('mousedown', function(e) {
      let ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = e.offsetX + 'px';
      ripple.style.top = e.offsetY + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Modals close on Esc
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal, .quiz-modal').forEach(modal => {
        modal.classList.remove('active');
      });
    }
  });

  // Back to Top button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.style.display = 'block';
      } else {
        backToTop.style.display = 'none';
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    // Chart timeframe switch
    const chartTimeframe = document.getElementById('chartTimeframe');
    const chartImg = document.getElementById('chartImg');
    if (chartTimeframe && chartImg) {
      chartTimeframe.addEventListener('change', () => {
        if (chartTimeframe.value === '1d') {
          chartImg.src = 'https://dummyimage.com/600x280/edf2f7/aaa&text=Stock+Chart+1D';
        } else if (chartTimeframe.value === '1w') {
          chartImg.src = 'https://dummyimage.com/600x280/edf2f7/aaa&text=Stock+Chart+1W';
        } else {
          chartImg.src = 'https://dummyimage.com/600x280/edf2f7/aaa&text=Stock+Chart+1M';
        }
      });
    }
    // Leaderboard shuffle
    const leaderboardTable = document.getElementById('leaderboardTable');
    const shuffleBtn = document.getElementById('shuffleLeaderboard');
    if (leaderboardTable && shuffleBtn) {
      shuffleBtn.addEventListener('click', () => {
        const tbody = leaderboardTable.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const youRow = rows.find(row => row.classList.contains('you-row'));
        const otherRows = rows.filter(row => !row.classList.contains('you-row'));
        for (let i = otherRows.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          tbody.insertBefore(otherRows[j], otherRows[i]);
          [otherRows[i], otherRows[j]] = [otherRows[j], otherRows[i]];
        }
        if (youRow) tbody.insertBefore(youRow, tbody.children[4]);
        Array.from(tbody.children).forEach((row, idx) => {
          row.classList.remove('rank-1', 'rank-2', 'rank-3');
          if (idx === 0) row.classList.add('rank-1');
          else if (idx === 1) row.classList.add('rank-2');
          else if (idx === 2) row.classList.add('rank-3');
        });
      });
    }
  }

  // AI MENTOR PAGE INTERACTIVITY
  if (window.location.pathname.endsWith('ai.html')) {
    // Expand/collapse AI Mentor cards
    document.querySelectorAll('.ai-mentor-card').forEach(card => {
      card.addEventListener('click', function () {
        document.querySelectorAll('.ai-mentor-card').forEach(c => {
          if (c !== card) c.classList.remove('expanded');
        });
        card.classList.toggle('expanded');
        let info = card.getAttribute('data-info');
        if (card.classList.contains('expanded')) {
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
      });
      card.addEventListener('blur', function () {
        card.classList.remove('expanded');
        let more = card.querySelector('.ai-more-info');
        if (more) more.remove();
      });
    });
    // What If? Simulator
    const whatIfForm = document.getElementById('whatIfForm');
    const whatIfResult = document.getElementById('whatIfResult');
    if (whatIfForm && whatIfResult) {
      whatIfForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const stock = document.getElementById('whatIfStock').value.trim().toUpperCase();
        const date = document.getElementById('whatIfDate').value;
        if (!stock || !date) return;
        // Fake random result
        const gain = Math.random() > 0.5;
        const percent = (Math.random() * 20 + 1).toFixed(2);
        whatIfResult.textContent = gain ? `You would have gained +${percent}% on ${stock} since ${date}! 🎉` : `You would have lost -${percent}% on ${stock} since ${date}. 😬`;
        whatIfResult.style.color = gain ? '#38b2ac' : '#e53e3e';
      });
    }
  }

  // SOCIAL PAGE INTERACTIVITY
  if (window.location.pathname.endsWith('social.html')) {
    // Clubs expand/collapse
    document.querySelectorAll('.club-card').forEach(card => {
      const btn = card.querySelector('.toggle-club');
      const details = card.querySelector('.club-details');
      btn.addEventListener('click', () => {
        if (details.style.display === 'none' || !details.style.display) {
          details.style.display = 'block';
          btn.textContent = 'Hide Details';
        } else {
          details.style.display = 'none';
          btn.textContent = 'Show Details';
        }
      });
      card.addEventListener('blur', () => {
        details.style.display = 'none';
        btn.textContent = 'Show Details';
      });
    });
    // Ask Mentor chat
    const mentorForm = document.getElementById('mentorForm');
    const mentorInput = document.getElementById('mentorInput');
    const mentorResponse = document.getElementById('mentorResponse');
    if (mentorForm && mentorInput && mentorResponse) {
      mentorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = mentorInput.value.trim();
        if (!q) return;
        // Canned AI response
        let response = '';
        if (q.toLowerCase().includes('stock')) response = 'Start by learning the basics, set your goals, and use Stoxly's virtual market to practice!';
        else if (q.toLowerCase().includes('risk')) response = 'Diversify your portfolio and never invest more than you can afford to lose.';
        else if (q.toLowerCase().includes('ipo')) response = 'An IPO is when a company first offers shares to the public. Research before investing!';
        else response = 'Great question! Our mentors will get back to you soon.';
        mentorResponse.innerHTML = `<div class='mentor-msg user-msg'>${q}</div><div class='mentor-msg ai-msg'>${response}</div>`;
        mentorInput.value = '';
      });
    }
  }

  // PROFILE PAGE INTERACTIVITY
  if (window.location.pathname.endsWith('profile.html')) {
    // Edit Profile modal
    const editProfileModal = document.getElementById('editProfileModal');
    const openEditProfile = document.getElementById('openEditProfile');
    const closeEditProfile = document.getElementById('closeEditProfile');
    if (openEditProfile && editProfileModal) {
      openEditProfile.addEventListener('click', (e) => {
        e.stopPropagation();
        editProfileModal.classList.add('active');
      });
    }
    if (closeEditProfile && editProfileModal) {
      closeEditProfile.addEventListener('click', () => editProfileModal.classList.remove('active'));
    }
    window.addEventListener('click', (e) => {
      if (e.target === editProfileModal) editProfileModal.classList.remove('active');
    });
    // Badge tooltips are native via title attribute
  }
}); 