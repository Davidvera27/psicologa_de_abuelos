import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { jsPDF } from 'jspdf';
import SignatureCanvas from 'react-signature-canvas';
import logo from '../assets/logo_psico_abuelos_full_hd.jpeg';
import membrete from '../assets/membrete.png'; // Añade el membrete aquí

const Contrato2 = forwardRef((props, ref) => {
  const { paciente } = props;
  const sigCanvasPacienteRef = useRef(null);
  const sigCanvasProfesionalRef = useRef(null);

  const getDiasPorTiquetera = (tiquetera) => {
    const tiqueteraDias = {
      T1: 4,
      T2: 8,
      T3: 12,
      T4: 16,
      T5: 20,
    };
    return tiqueteraDias[tiquetera] || '';
  };

  useImperativeHandle(ref, () => ({
    generatePDF() {
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      let yPosition = margin;

      const addText = (text, x, y, options = {}) => {
        const lines = pdf.splitTextToSize(text, options.width || pdf.internal.pageSize.getWidth() - margin * 2);
        for (let i = 0; i < lines.length; i++) {
          if (yPosition >= pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
            // Añadir la marca de agua en cada página nueva
            pdf.addImage(membrete, 'PNG', 0, 0, pageWidth, pageHeight);
          }
          pdf.text(lines[i], x, yPosition);
          yPosition += options.lineHeight || 12;
        }
      };

      // Añadir la marca de agua
      pdf.addImage(membrete, 'PNG', 0, 0, pageWidth, pageHeight);

      // Añadir el logo
      pdf.addImage(logo, 'JPEG', margin, yPosition, 60, 60);
      yPosition += 80;

      pdf.setFontSize(14);
      pdf.text('TÉRMINOS Y CONDICIONES CENTRO DE DÍA', pdf.internal.pageSize.getWidth() / 2, yPosition, null, null, 'center');
      yPosition += 28;

      pdf.setFontSize(10);
      addText(`Paciente: ${paciente.nombre} ${paciente.apellidos}`, margin, yPosition, { lineHeight: 14 });
      addText(`Número de identificación: ${paciente.documento}`, margin, yPosition, { lineHeight: 14 });
      addText(`Nacimiento: ${new Date(paciente.fechaNacimiento).toLocaleDateString()}`, margin, yPosition, { lineHeight: 14 });
      addText(`Convenio: Sin convenio (Sin empresa)`, margin, yPosition, { lineHeight: 14 });
      addText(`Sexo: ${paciente.genero}`, margin, yPosition, { lineHeight: 14 });
      addText(`Edad: ${paciente.edad} años`, margin, yPosition, { lineHeight: 14 });
      yPosition += 28;

      pdf.setFontSize(12);
      addText('TÉRMINOS Y CONDICIONES DE USO DEL SERVICIO DE CENTRO DE DÍA CON LA FUNDACIÓN PSICÓLOGA DE ABUELOS', margin, yPosition, { lineHeight: 14 });
      yPosition += 28;

      pdf.setFontSize(10);
      const terms = [
        { title: 'PRIMERO: PLAN ELEGIDO', text: `El usuario(s) ha elegido contratar una tiquetera mensual de ${getDiasPorTiquetera(paciente.tiquetera)} días.` },
        { title: 'SEGUNDO:', text: 'Los días contratados en la Tiquetera deben ser consumidos en el mes que se adquiere el servicio de Tiquetera, los días no serán acumulados para los meses siguientes, cualquier ausencia por fuera de fuerza mayor o por fallecimiento de algún familiar, no serán abonados ni reembolsados por la FUNDACIÓN.' },
        { title: 'TERCERO:', text: 'El servicio de transporte incluye recoger al usuario en su lugar de residencia y llevarlo a las instalaciones de la fundación, así como su regreso al domicilio.' },
        { title: 'CUARTO:', text: 'Exclusión de responsabilidad: la FUNDACIÓN pondrá toda su diligencia posible en la prestación del servicio, sin embargo, la obligación por parte de la FUNDACIÓN será de medio, más no de resultado. Es decir, que no se garantiza algún resultado en especial en el avance psicológico o terapéutico del paciente. De la misma manera, no existirá responsabilidad por parte de la FUNDACIÓN, de cualquier accidente que se pueda llegar a presentar en las instalaciones de la FUNDACIÓN o durante el transporte.' },
        { title: 'QUINTO:', text: 'Los usuarios (adulto mayor o acudiente familiar) autorizan previamente a la FUNDACIÓN, para realizar grabaciones de las actividades realizadas en el Jardín de los abuelos y se autoriza su publicación en redes sociales, a fin de iniciar y animar a la integración con los demás adultos mayores de la FUNDACIÓN.' },
        { title: 'SEXTO:', text: 'Los usuarios (adulto mayor o acudiente familiar) informan las restricciones o limitaciones que posee el adulto mayor y las cuales son importantes que las conozca la FUNDACIÓN, en la anamnesis o historia clínica que se realiza en el ingreso del adulto mayor.' },
        { title: 'SÉPTIMO:', text: 'La familia cumple un rol significativo en el proceso de atención del adulto mayor, por tal razón se compromete a participar de las actividades o reuniones que sean convocadas por el personal de la FUNDACIÓN.' },
        { title: 'OCTAVO:', text: 'En el campo de "Firma del Paciente" deberá firmar la persona responsable del pago del servicio y encargada de realizar la inscripción del adulto mayor.' }
      ];

      terms.forEach(term => {
        pdf.setFontSize(12);
        addText(term.title, margin, yPosition, { lineHeight: 14 });
        pdf.setFontSize(10);
        addText(term.text, margin, yPosition, { lineHeight: 12 });
        yPosition += 14;
      });

      // Añadir firmas
      if (sigCanvasPacienteRef.current && !sigCanvasPacienteRef.current.isEmpty()) {
        const signatureImgData = sigCanvasPacienteRef.current.toDataURL('image/png');
        if (yPosition + 50 >= pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
          // Añadir la marca de agua en cada página nueva
          pdf.addImage(membrete, 'PNG', 0, 0, pageWidth, pageHeight);
        }
        pdf.addImage(signatureImgData, 'PNG', 150, yPosition, 200, 50);
        yPosition += 60;
      }

      if (sigCanvasProfesionalRef.current && !sigCanvasProfesionalRef.current.isEmpty()) {
        const signatureImgData = sigCanvasProfesionalRef.current.toDataURL('image/png');
        if (yPosition + 50 >= pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
          // Añadir la marca de agua en cada página nueva
          pdf.addImage(membrete, 'PNG', 0, 0, pageWidth, pageHeight);
        }
        pdf.addImage(signatureImgData, 'PNG', 400, yPosition, 200, 50);
        yPosition += 60;
      }

      pdf.text(`Firma Paciente`, 150, yPosition);
      pdf.text(`Firma Profesional`, 400, yPosition);

      yPosition += 28;
      pdf.text(`Fundación psicóloga de abuelos`, pdf.internal.pageSize.getWidth() / 2, yPosition, null, null, 'center');
      yPosition += 14;
      pdf.text(`Cra 72 # 26 A 20, Belén San Bernardo , Medellín +573005573132`, pdf.internal.pageSize.getWidth() / 2, yPosition, null, null, 'center');

      pdf.save(`Contrato T.T. ${paciente.nombre} ${paciente.apellidos}.pdf`);
    }
  }));

  return (
    <div>
      <div id="contrato2" style={{ padding: '40px', backgroundColor: 'white', color: 'black', fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <img src={logo} alt="Logo" style={{ height: '60px' }} />
        </div>
        <h1 style={{ textAlign: 'center', textDecoration: 'underline', marginBottom: '20px' }}>TÉRMINOS Y CONDICIONES CENTRO DE DÍA</h1>
        <div style={{ marginBottom: '20px' }}>
          <h3>Paciente:</h3>
          <p><strong>Nombre:</strong> {paciente.nombre} {paciente.apellidos}</p>
          <p><strong>Número de identificación:</strong> {paciente.documento}</p>
          <p><strong>Nacimiento:</strong> {new Date(paciente.fechaNacimiento).toLocaleDateString()}</p>
          <p><strong>Convenio:</strong> Sin convenio (Sin empresa)</p>
          <p><strong>Sexo:</strong> {paciente.genero}</p>
          <p><strong>Edad:</strong> {paciente.edad} años</p>
        </div>
        <h3>TÉRMINOS Y CONDICIONES DE USO DEL SERVICIO DE CENTRO DE DÍA CON LA FUNDACIÓN PSICÓLOGA DE ABUELOS</h3>
        <p>
          LA FUNDACIÓN PSICÓLOGA DE ABUELOS, identificada con NIT. 901.593.440 -1 en adelante “LA FUNDACIÓN”, y de otro lado el adulto mayor y su acudiente,
          quienes en adelante se denominará EL USUARIO(S), identificados con No. de Cédula de ciudadanía han suscrito el siguiente acuerdo donde el Usuario/adulto mayor
          disfrutará de los servicios ofrecidos por la FUNDACIÓN PSICÓLOGA DE ABUELOS en la modalidad del CENTRO DE DÍA y se regirá por las siguientes condiciones:
        </p>
        <h4>PRIMERO: PLAN ELEGIDO</h4>
        <p>
          El usuario(s) ha elegido contratar una tiquetera mensual de {getDiasPorTiquetera(paciente.tiquetera)} días.
        </p>
        <h4>SEGUNDO:</h4>
        <p>
          Los días contratados en la Tiquetera deben ser consumidos en el mes que se adquiere el servicio de Tiquetera, los días no serán acumulados para los meses siguientes,
          cualquier ausencia por fuera de fuerza mayor o por fallecimiento de algún familiar, no serán abonados ni reembolsados por la FUNDACIÓN.
        </p>
        <h4>TERCERO:</h4>
        <p>
          El servicio de transporte incluye recoger al usuario en su lugar de residencia y llevarlo a las instalaciones de la fundación, así como su regreso al domicilio.
        </p>
        <h4>CUARTO:</h4>
        <p>
          Exclusión de responsabilidad: la FUNDACIÓN pondrá toda su diligencia posible en la prestación del servicio, sin embargo, la obligación por parte de la FUNDACIÓN será de medio, más no de resultado.
          Es decir, que no se garantiza algún resultado en especial en el avance psicológico o terapéutico del paciente. De la misma manera, no existirá responsabilidad por parte de la FUNDACIÓN,
          de cualquier accidente que se pueda llegar a presentar en las instalaciones de la FUNDACIÓN o durante el transporte.
        </p>
        <h4>QUINTO:</h4>
        <p>
          Los usuarios (adulto mayor o acudiente familiar) autorizan previamente a la FUNDACIÓN, para realizar grabaciones de las actividades realizadas en el Jardín de los abuelos y se autoriza su publicación en redes sociales,
          a fin de iniciar y animar a la integración con los demás adultos mayores de la FUNDACIÓN.
        </p>
        <h4>SEXTO:</h4>
        <p>
          Los usuarios (adulto mayor o acudiente familiar) informan las restricciones o limitaciones que posee el adulto mayor y las cuales son importantes que las conozca la FUNDACIÓN,
          en la anamnesis o historia clínica que se realiza en el ingreso del adulto mayor.
        </p>
        <h4>SÉPTIMO:</h4>
        <p>
          La familia cumple un rol significativo en el proceso de atención del adulto mayor, por tal razón se compromete a participar de las actividades o reuniones que sean convocadas por el personal de la FUNDACIÓN.
        </p>
        <h4>OCTAVO:</h4>
        <p>
          En el campo de "Firma del Paciente" deberá firmar la persona responsable del pago del servicio y encargada de realizar la inscripción del adulto mayor.
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px' }}>
          <div style={{ textAlign: 'center' }}>
            <SignatureCanvas ref={sigCanvasPacienteRef} canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} />
            <p>Firma Paciente</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <SignatureCanvas ref={sigCanvasProfesionalRef} canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} />
            <p>Firma Profesional</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p>Fundación psicóloga de abuelos</p>
          <p>Cra 72 # 26 A 20, Belén San Bernardo , Medellín +573005573132</p>
        </div>
      </div>
    </div>
  );
});

export default Contrato2;
