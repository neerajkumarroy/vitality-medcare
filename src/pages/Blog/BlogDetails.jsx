import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Share2,
  Stethoscope,
} from "lucide-react";

import { blogPosts } from "./blogData";
import "./BlogDetails.css";

const BlogDetails = () => {
  const { id } = useParams();

  const post = blogPosts.find((item) => String(item.id) === String(id));

  if (!post) {
    return (
      <main className="blog-details-page">
        <section className="blog-not-found">
          <span>ARTICLE NOT FOUND</span>

          <h1>
            This article
            <strong>doesn't exist.</strong>
          </h1>

          <Link to="/blog">
            <ArrowLeft size={15} />
            Back to Blog
          </Link>
        </section>
      </main>
    );
  }

  const relatedPosts = blogPosts
    .filter((item) => item.id !== post.id)
    .slice(0, 3);

  return (
    <main className="blog-details-page">
      {/* =====================================================
          ARTICLE HERO
      ===================================================== */}

      <section className="blog-details-hero">
        <div className="blog-details-hero-container">
          <Link to="/blog" className="blog-details-back">
            <ArrowLeft size={15} />
            Back to Health Blog
          </Link>

          <div className="blog-details-category">{post.category}</div>

          <h1>{post.title}</h1>

          <p className="blog-details-excerpt">{post.excerpt}</p>

          <div className="blog-details-meta">
            <span>
              <CalendarDays size={15} />
              {post.date}
            </span>

            <span>
              <Clock3 size={15} />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED IMAGE
      ===================================================== */}

      <section className="blog-details-featured">
        <div className="blog-details-featured-container">
          <div className="blog-details-featured-image">
            <img src={post.image} alt={post.title} />
          </div>
        </div>
      </section>

      {/* =====================================================
          ARTICLE CONTENT
      ===================================================== */}

      <section className="blog-details-content-section">
        <div className="blog-details-content-layout">
          {/* ARTICLE */}

          <article className="blog-details-article">
            <p className="article-lead">
              Taking care of your health starts with understanding your body and
              making informed decisions. Staying informed can help you build
              healthier routines and know when professional medical guidance may
              be appropriate.
            </p>

            <h2>Why This Matters</h2>

            <p>
              Good healthcare is about more than treating an illness. Preventive
              care, regular health assessments, healthy daily habits, and timely
              professional guidance can all contribute to long-term wellbeing.
            </p>

            <p>
              Understanding your health gives you the opportunity to make
              informed choices and discuss concerns with a qualified healthcare
              professional.
            </p>

            {/* INFO BOX */}

            <div className="article-highlight">
              <div className="article-highlight-icon">
                <Stethoscope size={20} />
              </div>

              <div>
                <strong>A simple approach to better health</strong>

                <p>
                  Pay attention to changes in your health, maintain healthy
                  routines, and seek professional advice when you have concerns.
                </p>
              </div>
            </div>

            <h2>Healthy Habits to Consider</h2>

            <p>
              Small, consistent habits can support everyday wellbeing. Consider
              maintaining balanced nutrition, regular physical activity,
              adequate rest, and routine healthcare visits when recommended.
            </p>

            <ul className="article-list">
              <li>Maintain a balanced and varied diet.</li>

              <li>Stay physically active according to your abilities.</li>

              <li>Prioritize adequate sleep and recovery.</li>

              <li>Keep up with recommended health checkups.</li>

              <li>
                Discuss persistent health concerns with a qualified
                professional.
              </li>
            </ul>

            <h2>When Professional Advice Can Help</h2>

            <p>
              If a health concern continues, changes over time, or begins
              affecting your everyday life, professional medical guidance can
              help you understand the appropriate next steps.
            </p>

            <p>
              Every person's health situation is different, so personalized
              advice from a qualified healthcare professional is important when
              addressing specific concerns.
            </p>

            {/* DISCLAIMER */}

            <div className="article-disclaimer">
              <strong>Medical Information Notice</strong>

              <p>
                This article is intended for general educational purposes and
                should not replace personalized medical advice, diagnosis, or
                treatment.
              </p>
            </div>
          </article>

          {/* SIDEBAR */}

          <aside className="blog-details-sidebar">
            <div className="sidebar-share-card">
              <span>SHARE ARTICLE</span>

              <button type="button">
                <Share2 size={15} />
                Share
              </button>
            </div>

            <div className="sidebar-appointment-card">
              <div className="sidebar-icon">
                <Stethoscope size={20} />
              </div>

              <span>NEED MEDICAL GUIDANCE?</span>

              <h3>
                Talk to our
                <strong>medical team.</strong>
              </h3>

              <p>
                Have a health concern? Schedule a consultation with our
                experienced healthcare team.
              </p>

              <Link to="/book-appointment">
                Book Appointment
                <ArrowRight size={15} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* =====================================================
          RELATED ARTICLES
      ===================================================== */}

      <section className="related-blog-section">
        <div className="related-blog-container">
          <div className="related-blog-header">
            <div>
              <span>CONTINUE READING</span>

              <h2>
                More Health
                <strong>Insights.</strong>
              </h2>
            </div>

            <Link to="/blog">
              View All Articles
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="related-blog-grid">
            {relatedPosts.map((item) => (
              <article className="related-blog-card" key={item.id}>
                <div className="related-blog-image">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="related-blog-content">
                  <span>{item.category}</span>

                  <h3>{item.title}</h3>

                  <Link to={`/blog/${item.id}`}>
                    Read Article
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="blog-details-cta">
        <div className="blog-details-cta-container">
          <div>
            <span>PERSONALIZED HEALTHCARE</span>

            <h2>
              Your Health.
              <strong>Our Priority.</strong>
            </h2>
          </div>

          <Link to="/book-appointment" className="blog-details-cta-button">
            Book an Appointment
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default BlogDetails;
