import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { getPortfolioSections } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

const forecastApiChecksEN = [
  'HTTP status',
  'Response schema',
  'Forecast periods',
  'Expected values',
  'Error handling',
  'Integration behavior',
];

const forecastApiChecksID = [
  'Status HTTP',
  'Skema respons',
  'Periode prediksi',
  'Nilai yang diharapkan',
  'Penanganan error',
  'Perilaku integrasi',
];

export const EngineeringPage: React.FC = () => {
  const { language } = useLanguage();
  const engineeringMeta = getPortfolioSections(language)[1];

  const checks = language === 'id' ? forecastApiChecksID : forecastApiChecksEN;

  return (
    <div className="page-engineering">
      <SectionHeader
        number={engineeringMeta.number}
        title={engineeringMeta.title}
        suit={engineeringMeta.cardSuit}
      />

      <section className="engineering-focus" aria-labelledby="engineering-focus-heading">
        <header className="engineering-intro">
          <h2 id="engineering-focus-heading">
            {language === 'id' ? (
              <>
                Buat <span>tepat sasaran</span>. Buat <span>berfungsi baik</span>.
              </>
            ) : (
              <>
                Make it <span>fit</span>. Make it <span>work</span>.
              </>
            )}
          </h2>
          <p>
            {language === 'id'
              ? 'Saya memulai dari perilaku yang dibutuhkan oleh suatu masalah, kemudian mencari implementasi yang benar, mudah dipahami, dan praktis. Bukan sekadar mengejar kompleksitas semata.'
              : 'I start with the behavior a problem calls for, then look for an implementation that is correct, understandable, and practical. Not complexity for its own sake.'}
          </p>
        </header>

        <div className="engineering-grid">
          <article className="surface-card engineering-card">
            <div className="engineering-card-heading">
              <span className="engineering-card-number">01</span>
              <h3>
                {language === 'id'
                  ? 'Sesuaikan dengan masalah, bukan polanya.'
                  : 'Fit the problem, not the pattern.'}
              </h3>
            </div>
            <p>
              {language === 'id'
                ? 'Kecanggihan teknis bukanlah tujuan akhir. Batasan masalah dan perilaku yang diharapkanlah yang semestinya membentuk solusi.'
                : 'Technical sophistication is not the goal. The constraints and intended behavior should shape the solution.'}
            </p>
            <div
              className="engineering-sequence"
              aria-label={
                language === 'id'
                  ? 'Mulai dari kebutuhan, perhitungkan batasan, dan verifikasi perilaku'
                  : 'Start with the need, account for constraints, and check the behavior'
              }
            >
              <span>{language === 'id' ? 'Kebutuhan' : 'Need'}</span>
              <span aria-hidden="true">→</span>
              <span>{language === 'id' ? 'Batasan' : 'Constraints'}</span>
              <span aria-hidden="true">→</span>
              <span>{language === 'id' ? 'Perilaku' : 'Behavior'}</span>
            </div>
          </article>

          <article className="surface-card engineering-card">
            <div className="engineering-card-heading">
              <span className="engineering-card-number">02</span>
              <h3>
                {language === 'id'
                  ? 'Perhatikan titik temu antar-komponen.'
                  : 'Pay attention to the joins.'}
              </h3>
            </div>
            <p>
              {language === 'id'
                ? 'Saya terbiasa bekerja di berbagai bagian proyek, dan saya tertarik pada bagaimana setiap tanggung jawab memengaruhi bagian berikutnya tanpa mengasumsikan satu struktur cocok untuk setiap sistem.'
                : 'I’ve worked across these parts of projects, and I’m interested in how each responsibility affects the next without assuming one structure fits every system.'}
            </p>
          </article>

          <article className="surface-card engineering-card engineering-evidence">
            <div className="engineering-evidence-copy">
              <div className="engineering-card-heading">
                <span className="engineering-card-number">03</span>
                <h3>
                  {language === 'id'
                    ? 'Verifikasi apa yang dijanjikan API.'
                    : 'Check what the API promises.'}
                </h3>
              </div>
              <p>
                {language === 'id'
                  ? "Saya terbiasa memverifikasi API pada Mercury, Aegis, dan Lux. Pengujian otomatis membandingkan respons dengan keluaran yang diharapkan di berbagai skenario perilaku ini."
                  : "I’ve worked on verifying Mercury’s, Aegis', and Lux's forecast API. Their automated tests compare responses with known expected outputs across these behaviors."}
              </p>
            </div>

            <div className="engineering-evidence-details">
              <div className="engineering-checks">
                <p className="engineering-detail-label">
                  {language === 'id' ? 'Pemeriksaan kontrak API' : 'API contract checks'}
                </p>
                <ul>
                  {checks.map((check) => (
                    <li key={check}>{check}</li>
                  ))}
                </ul>
              </div>
              <p className="engineering-scope-note">
                <span>{language === 'id' ? 'Sudut pandang berbeda' : 'Different question'}</span>
                {language === 'id'
                  ? 'Respons API yang valid secara skema tidak menjamin akurasi prediksi di dunia nyata. Akurasi model machine learning tidak dievaluasi di sini.'
                  : 'A correct API response does not establish real-world forecast accuracy. Model accuracy is not evaluated here.'}
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};
