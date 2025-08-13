"use client";

import React from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag, Share2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { blogsData } from '@/lib/data/blogs';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const blogId = parseInt(params.id);
  const blog = blogsData.find(b => b.id === blogId);

  if (!blog) {
    notFound();
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(shareUrl);
      // You could show a toast notification here
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/#blogs"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blogs</span>
            </Link>
            
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </header>

      {/* Blog Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          {/* Blog Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 not-prose"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(blog.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Technical Article</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-muted-foreground leading-relaxed"
            >
              {blog.excerpt}
            </motion.p>
          </motion.div>

          {/* Blog Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8 not-prose"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="w-16 h-16 text-primary/60 mx-auto mb-4" />
                  <p className="text-muted-foreground">Featured Article</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Blog Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="blog-content"
          >
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-lg"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={cn("bg-muted px-1.5 py-0.5 rounded text-sm", className)} {...props}>
                      {children}
                    </code>
                  );
                },
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mt-12 mb-6 text-foreground border-b border-border pb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 leading-relaxed text-foreground/90">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-4 space-y-2 text-foreground/90">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-4 space-y-2 text-foreground/90">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">
                    {children}
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-6 my-6 italic text-muted-foreground">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="w-full border-collapse border border-border">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-border px-4 py-2 bg-muted font-semibold text-left">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-border px-4 py-2">
                    {children}
                  </td>
                ),
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </motion.div>

          {/* Author Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 p-6 rounded-xl bg-muted/50 border border-border not-prose"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                PS
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Prateek Srivastava
                </h3>
                <p className="text-muted-foreground mb-3">
                  Full Stack Developer & Software Engineer specializing in AI-powered educational platforms, 
                  climate visualization, and healthcare technology. Passionate about creating impactful 
                  solutions that solve real-world problems.
                </p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>📧 prateek.srivastava2311@gmail.com</span>
                  <span>🔗 GitHub: prats-2311</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.article>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 flex justify-between items-center"
        >
          <Link
            href="/#blogs"
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Blogs</span>
          </Link>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Article</span>
          </button>
        </motion.div>
      </main>
    </div>
  );
}
