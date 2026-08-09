import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock3, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import { blogPosts } from "./blogData";
import "./Blog.css";

const Blog = () => {
  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

  return (
    <main className="blog-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="blog-hero">
        <div className="blog-hero-container">
          <motion.div
            className="blog-hero-content"
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="blog-section-label">HEALTH & WELLNESS</span>

            <h1>
              Better Health
              <span>Starts With Knowledge.</span>
            </h1>

            <p>
              Helpful insights, practical health advice, and expert guidance
              from the Vitality MedCare team to help you make informed decisions
              about your health.
            </p>
          </motion.div>

          <div className="blog-hero-visual">
            <div className="blog-hero-image">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=90"
                alt="Doctor discussing healthcare with patient"
              />
            </div>

            <div className="blog-hero-info">
              <div className="blog-hero-info-item">
                <strong>25+</strong>
                <span>Health Articles</span>
              </div>

              <div className="blog-hero-info-divider"></div>

              <div className="blog-hero-info-item">
                <strong>Expert</strong>
                <span>Medical Insights</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED ARTICLE
      ===================================================== */}

      <section className="blog-featured">
        <div className="blog-featured-container">
          <div className="blog-section-heading">
            <div>
              <span className="blog-section-label">FEATURED ARTICLE</span>

              <h2>
                Featured
                <span>Health Insight.</span>
              </h2>
            </div>

            <Link to="/blog" className="blog-view-link">
              View All Articles
              <ArrowRight size={15} />
            </Link>
          </div>

          <motion.article
            className="featured-blog-card"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="featured-blog-image">
              <img src={featuredPost.image} alt={featuredPost.title} />
            </div>

            <div className="featured-blog-content">
              <span className="blog-category">{featuredPost.category}</span>

              <h3>{featuredPost.title}</h3>

              <p>{featuredPost.excerpt}</p>

              <div className="blog-meta">
                <span>
                  <CalendarDays size={13} />
                  {featuredPost.date}
                </span>

                <span>
                  <Clock3 size={13} />
                  {featuredPost.readTime}
                </span>
              </div>

              <Link
                to={`/blog/${featuredPost.id}`}
                className="blog-read-button"
              >
                Read Article
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.article>
        </div>
      </section>

      {/* =====================================================
          BLOG GRID
      ===================================================== */}

      <section className="blog-list">
        <div className="blog-list-container">
          <div className="blog-section-heading">
            <div>
              <span className="blog-section-label">FROM OUR BLOG</span>

              <h2>
                Health Tips &<span>Expert Advice.</span>
              </h2>
            </div>
          </div>

          <div className="blog-grid">
            {remainingPosts.map((post, index) => (
              <motion.article
                className="blog-card"
                key={post.id}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                }}
                whileHover={{
                  y: -5,
                }}
              >
                <div className="blog-card-image">
                  <img src={post.image} alt={post.title} />

                  <span className="blog-card-category">{post.category}</span>
                </div>

                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span>{post.date}</span>

                    <span>{post.readTime}</span>
                  </div>

                  <h3>{post.title}</h3>

                  <p>{post.excerpt}</p>

                  <Link to={`/blog/${post.id}`} className="blog-card-link">
                    Read More
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          HEALTH CTA
      ===================================================== */}

      <section className="blog-health-cta">
        <div className="blog-health-container">
          <div>
            <span>PERSONALIZED HEALTHCARE</span>

            <h2>
              Have Questions About
              <strong>Your Health?</strong>
            </h2>

            <p>
              Reading health information is a great first step. For personal
              concerns, speak with a qualified healthcare professional.
            </p>
          </div>

          <Link to="/book-appointment" className="blog-health-button">
            Book an Appointment
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* =====================================================
          NEWSLETTER
      ===================================================== */}

      <section className="blog-newsletter">
        <div className="blog-newsletter-container">
          <div className="blog-newsletter-icon">
            <Mail size={22} />
          </div>

          <div className="blog-newsletter-content">
            <span>STAY INFORMED</span>

            <h2>Get Helpful Health Tips.</h2>

            <p>
              Receive occasional health insights and wellness updates from our
              clinic.
            </p>
          </div>

          <form className="blog-newsletter-form">
            <input type="email" placeholder="Enter your email address" />

            <button type="submit">
              Subscribe
              <ArrowRight size={15} />
            </button>
          </form>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="blog-final-cta">
        <div className="blog-final-container">
          <div>
            <span>YOUR HEALTH MATTERS</span>

            <h2>
              Take the Next Step
              <strong>Toward Better Health.</strong>
            </h2>
          </div>

          <Link to="/book-appointment" className="blog-final-button">
            Book Appointment
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Blog;
