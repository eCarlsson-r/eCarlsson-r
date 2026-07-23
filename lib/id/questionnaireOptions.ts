/**
 * Bahasa Indonesia display labels for the /start-a-project questionnaire.
 *
 * The API's option values (English) are the canonical values — they're
 * what gets submitted to /api/leads and matched by the recommendation
 * engine, so they must never be translated in state or in the payload.
 * This file only maps those values to what the user reads on screen.
 *
 * translateOption() falls back to the raw English value when a key is
 * missing, so a new option added on the backend shows up untranslated
 * instead of breaking the page — add it here when you notice it.
 */

export function translateOption(dict: Record<string, string>, value: string): string {
  return dict[value] ?? value;
}

export const industryLabels: Record<string, string> = {
  "AI": "Kecerdasan Buatan (AI)",
  "Agencies": "Agensi",
  "Banking": "Perbankan",
  "Beauty": "Kecantikan",
  "Cafe": "Kafe",
  "Catering": "Katering",
  "Construction": "Konstruksi",
  "Consulting": "Konsultan",
  "E-Commerce": "Toko Online",
  "Education": "Pendidikan",
  "Fashion": "Fashion",
  "Finance": "Keuangan",
  "Financial Services": "Jasa Keuangan",
  "Fitness": "Kebugaran",
  "Food & Beverage": "Makanan & Minuman",
  "HR & Payroll": "SDM & Penggajian",
  "Healthcare": "Kesehatan",
  "Insurance": "Asuransi",
  "Investment": "Investasi",
  "Leasing": "Leasing",
  "Manufacturing": "Manufaktur",
  "Professional Services": "Jasa Profesional",
  "Property": "Properti",
  "Real Estate": "Real Estat",
  "Recruitment": "Rekrutmen",
  "Restaurant": "Restoran",
  "Retail": "Retail",
  "Spa": "Spa",
  "Wellness": "Wellness",
  "Wholesale": "Grosir",
};

export const buildTypeLabels: Record<string, string> = {
  "AI Assistant": "Asisten AI",
  "Booking": "Sistem Booking / Reservasi",
  "Customer Portal": "Portal Pelanggan",
  "Dashboard": "Dashboard Ringkasan Data",
  "E-Commerce": "Toko Online",
  "ERP": "Sistem Manajemen Bisnis (ERP)",
  "Internal System": "Sistem Internal Perusahaan",
  "POS": "Sistem Kasir (POS)",
};

export const problemLabels: Record<string, string> = {
  "Duplicate work": "Input data berulang-ulang",
  "Hiring mismatches": "Salah merekrut karyawan",
  "Manual spreadsheets": "Masih pakai Excel / catatan manual",
  "No HR": "Belum punya sistem SDM",
  "No booking": "Belum ada sistem booking / reservasi",
  "No candidate assessment": "Belum ada penilaian kandidat",
  "No dashboard": "Belum ada ringkasan data bisnis",
  "No inventory": "Belum ada pencatatan stok",
  "No reporting": "Belum ada laporan otomatis",
  "WhatsApp chaos": "Pesanan/chat berantakan di WhatsApp",
};

export const featureLabels: Record<string, string> = {
  "AI": "Kecerdasan Buatan (AI)",
  "API": "Integrasi dengan sistem lain (API)",
  "Authentication": "Login & Keamanan Akun",
  "Dashboard": "Dashboard Ringkasan Data",
  "Inventory": "Manajemen Stok",
  "Invoices": "Invoice / Faktur",
  "Mobile": "Aplikasi Mobile",
  "Notifications": "Notifikasi",
  "Payments": "Pembayaran Online",
  "Reports": "Laporan",
  "Roles": "Hak Akses Pengguna",
  "Scheduling": "Penjadwalan",
};

export const companySizeLabels: Record<string, string> = {
  "1-5": "1–5 orang",
  "5-20": "5–20 orang",
  "20-100": "20–100 orang",
  "100+": "Lebih dari 100 orang",
};
