import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa";

const PdfGenerator = ({ data, fileName = "Spiritual_visits.pdf", title = "Spiritual Visits Report", compact = false }) => {
  const generatePDF = () => {
    if (!data || data.length === 0) {
      alert("No data available for PDF generation");
      return;
    }

    const doc = new jsPDF('landscape');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Main Header with spiritual greeting
    doc.setFillColor(251, 191, 36); // Golden yellow
    doc.rect(0, 0, pageWidth, 20, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Satguru Rampal Ji Maharaj ki Jay", pageWidth / 2, 12, { align: "center" });
    
    // Main Title
    doc.setTextColor(59, 130, 246); // Blue
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Spiritual Visits Report", pageWidth / 2, 22, { align: "center" });
    
    // Report details with better spacing
    doc.setTextColor(75, 85, 99);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const generatedDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    doc.text(`Generated: ${generatedDate}`, pageWidth / 2, 29, { align: "center" });
    
    // User info and statistics in a single line with better spacing
    const userName = data[0]?.Name || "Devotee";
    const familyVisits = data.filter(item => item["Visit Type"]?.toLowerCase() === "family").length;
    const individualVisits = data.length - familyVisits;
    
    doc.setFontSize(9);
    doc.text(`Devotee: ${userName}`, 15, 36);
    doc.text(`Total Visits: ${data.length}`, pageWidth / 2, 36, { align: "center" });
    doc.text(`Family: ${familyVisits} | Individual: ${individualVisits}`, pageWidth - 15, 36, { align: "right" });

    // Table columns
    const tableColumn = ["#", "Name", "Place", "Date", "Visit Type", "Mantra", "Purpose", "Family Members"];
    
    const tableRows = data.map((item, index) => {
      // Format family members
      let familyDetails = "-";
      if (item["Visit Type"]?.toLowerCase() === "family" && item.FamilyMembers && item.FamilyMembers.length > 0) {
        familyDetails = item.FamilyMembers.map((member, idx) => 
          `${idx + 1}. ${member.name || 'N/A'} - ${member.relationship || 'N/A'} (${member.mantras || 'N/A'})`
        ).join('\n');
      }
      
      // Helper function for text truncation
      const truncateText = (text, maxLength = 30) => {
        if (!text || text.length <= maxLength) return text || "-";
        return text.substring(0, maxLength) + "...";
      };

      return [
        index + 1,
        truncateText(item.Name, 15),
        truncateText(item.Place, 20),
        item.Date || "-",
        item["Visit Type"] || "-",
        truncateText(item.Mantra, 25),
        truncateText(item.Purpose, 30),
        familyDetails
      ];
    });

    // Create main table
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 42,
      theme: 'grid',
      headStyles: {
        fillColor: [59, 130, 246], // Blue header
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 9,
        cellPadding: 3,
        halign: 'center'
      },
      bodyStyles: {
        fontSize: 8,
        cellPadding: 2,
        lineWidth: 0.1,
      },
      alternateRowStyles: {
        fillColor: [240, 249, 255], // Light blue alternate rows
      },
      styles: {
        overflow: 'linebreak',
        cellPadding: 2,
        fontSize: 8,
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
        halign: 'left'
      },
      columnStyles: {
        0: { cellWidth: 12, halign: 'center' }, // #
        1: { cellWidth: 25, halign: 'left' }, // Name
        2: { cellWidth: 30, halign: 'left' }, // Place
        3: { cellWidth: 25, halign: 'center' }, // Date
        4: { cellWidth: 20, halign: 'center' }, // Visit Type
        5: { cellWidth: 35, halign: 'left' }, // Mantra
        6: { cellWidth: 40, halign: 'left' }, // Purpose
        7: { cellWidth: 45, cellPadding: 2, fontSize: 7, valign: 'top', halign: 'left' }, // Family Members
      },
      margin: { left: 10, right: 10 },
      tableWidth: 'wrap',
      pageBreak: 'auto',
      showHead: 'everyPage',
      didDrawPage: function(data) {
        // Page number at bottom
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        const pageCount = doc.internal.getNumberOfPages();
        doc.text(
          `Page ${data.pageNumber} of ${pageCount}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: "center" }
        );
        
        // Add "Sat Saheb" at the end of each page
        if (data.pageNumber === pageCount) {
          doc.setFontSize(12);
          doc.setTextColor(251, 191, 36); // Golden color
          doc.setFont("helvetica", "bold");
          doc.text(
            "Sat Saheb",
            pageWidth / 2,
            pageHeight - 20,
            { align: "center" }
          );
        }
      }
    });

    doc.save(fileName);
  };

  return (
    <button
      className="bg-linear-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 text-white px-4 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={generatePDF}
      disabled={!data || data.length === 0}
      title="Download PDF Report"
    >
      <FaFilePdf />
      {!compact && <span>Download PDF</span>}
    </button>
  );
};

export default PdfGenerator;