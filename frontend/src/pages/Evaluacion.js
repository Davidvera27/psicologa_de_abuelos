import React, { useState } from 'react';
import styled from 'styled-components';

const EvaluationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${props => props.theme.palette.primary.main};
  margin-bottom: 2rem;
`;

const DropdownRow = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  width: 100%;
`;

const Label = styled.label`
  width: 200px;
  text-align: right;
  margin-right: 1rem;
  font-size: 1rem;
`;

const Dropdown = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  flex-grow: 1;
`;

const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
  padding: 1rem;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background: #f9f9f9;
`;

const CheckboxLabel = styled.label`
  margin-right: 1rem;
  font-size: 1rem;
`;

const Button = styled.button`
  margin: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: ${props => props.theme.palette.primary.main};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.palette.primary.dark};
  }
`;

const ResultText = styled.p`
  font-size: 1.2rem;
  margin-top: 1rem;
`;

const Table = styled.table`
  margin-top: 2rem;
  border-collapse: collapse;
  width: 100%;
  max-width: 500px;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: ${props => props.theme.palette.primary.main};
    color: white;
  }
`;

const AccordionSection = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const AccordionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.palette.primary.light};
  color: white;
  padding: 1rem;
  cursor: pointer;
  border-radius: 5px;
`;

const AccordionContent = styled.div`
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-height: ${props => (props.isOpen ? '1000px' : '0')};
  transition: max-height 0.3s ease;
`;

const Evaluacion = () => {
  const [formValues, setFormValues] = useState({
    evaluacion: '',
    barthel: {
      alimentacion: '',
      bano: '',
      arregloPersonal: '',
      vestido: '',
      defecacion: '',
      controlVesical: '',
      usoInodoro: '',
      traslados: '',
      movilidad: '',
      escaleras: ''
    },
    depresion: {
      pregunta1: '',
      pregunta2: '',
      pregunta3: '',
      pregunta4: '',
      pregunta5: '',
      pregunta6: '',
      pregunta7: '',
      pregunta8: '',
      pregunta9: '',
      pregunta10: '',
      pregunta11: '',
      pregunta12: '',
      pregunta13: '',
      pregunta14: '',
      pregunta15: ''
    },
    mmse: {
      orientacion: {
        year: false,
        season: false,
        date: false,
        day: false,
        month: false,
        city: false,
        country: false,
        province: false,
        hospital: false,
        floor: false
      },
      fijacion: {
        flag: false,
        tree: false,
        ball: false
      },
      atencion: {
        spell: '0',
      },
      recuerdo: {
        flag: false,
        tree: false,
        ball: false
      },
      nominacion: {
        watch: false,
        pencil: false
      },
      repeticion: false,
      lectura: false,
      habilidad: {
        paper: false,
        fold: false,
        put: false
      },
      escritura: false,
      copia: false
    }
  });

  const [mmseScore, setMmseScore] = useState(0);
  const [mmseResult, setMmseResult] = useState('');
  const [barthelScore, setBarthelScore] = useState(0);
  const [barthelResult, setBarthelResult] = useState('');
  const [depresionScore, setDepresionScore] = useState(0);
  const [depresionResult, setDepresionResult] = useState('');
  const [openSections, setOpenSections] = useState({
    orientacion: false,
    fijacion: false,
    atencion: false,
    recuerdo: false,
    nominacion: false,
    repeticion: false,
    lectura: false,
    habilidad: false,
    escritura: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const parts = name.split('.');
    if (parts.length === 2) {
      setFormValues(prev => ({
        ...prev,
        [parts[0]]: {
          ...prev[parts[0]],
          [parts[1]]: type === 'checkbox' ? checked : value
        }
      }));
    } else if (parts.length === 3) {
      setFormValues(prev => ({
        ...prev,
        [parts[0]]: {
          ...prev[parts[0]],
          [parts[1]]: {
            ...prev[parts[0]][parts[1]],
            [parts[2]]: type === 'checkbox' ? checked : value
          }
        }
      }));
    } else {
      setFormValues(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCalculateMmse = () => {
    const spellScore = parseInt(formValues.mmse.atencion.spell, 10);

    const score = Object.values(formValues.mmse.orientacion).filter(Boolean).length +
      Object.values(formValues.mmse.fijacion).filter(Boolean).length +
      spellScore +
      Object.values(formValues.mmse.recuerdo).filter(Boolean).length +
      (formValues.mmse.nominacion.watch ? 1 : 0) +
      (formValues.mmse.nominacion.pencil ? 1 : 0) +
      (formValues.mmse.repeticion ? 1 : 0) +
      (formValues.mmse.lectura ? 1 : 0) +
      (formValues.mmse.habilidad.paper ? 1 : 0) +
      (formValues.mmse.habilidad.fold ? 1 : 0) +
      (formValues.mmse.habilidad.put ? 1 : 0) +
      (formValues.mmse.escritura ? 1 : 0) +
      (formValues.mmse.copia ? 1 : 0);

    const cappedScore = Math.min(score, 30);

    let result = 'Deterioro cognitivo alto';
    if (cappedScore >= 27) {
      result = 'No existe deterioro cognitivo';
    } else if (cappedScore >= 25) {
      result = 'Existen dudas o pudiera existir un posible deterioro cognitivo';
    } else if (cappedScore >= 10) {
      result = 'Existe un deterioro cognitivo de leve a moderado';
    }

    setMmseScore(cappedScore);
    setMmseResult(result);
  };

  const handleClearMmse = () => {
    setFormValues(prev => ({
      ...prev,
      mmse: {
        orientacion: {
          year: false,
          season: false,
          date: false,
          day: false,
          month: false,
          city: false,
          country: false,
          province: false,
          hospital: false,
          floor: false
        },
        fijacion: {
          flag: false,
          tree: false,
          ball: false
        },
        atencion: {
          spell: '0',
        },
        recuerdo: {
          flag: false,
          tree: false,
          ball: false
        },
        nominacion: {
          watch: false,
          pencil: false
        },
        repeticion: false,
        lectura: false,
        habilidad: {
          paper: false,
          fold: false,
          put: false
        },
        escritura: false,
        copia: false
      }
    }));
    setMmseScore(0);
    setMmseResult('');
  };

  const handleCalculateBarthel = () => {
    const barthelPoints = {
      alimentacion: { '0': 0, '1': 5 },
      bano: { '0': 0, '1': 5 },
      arregloPersonal: { '1': 0, '0': 5 },
      vestido: { '0': 0, '1': 5, '2': 10 },
      defecacion: { '0': 0, '1': 5, '2': 10 },
      controlVesical: { '0': 0, '1': 5, '2': 10 },
      usoInodoro: { '0': 0, '1': 5, '2': 10 },
      traslados: { '0': 0, '1': 5, '2': 10, '3': 15 },
      movilidad: { '0': 0, '1': 5, '2': 10, '3': 15 },
      escaleras: { '0': 0, '1': 5, '2': 10 }
    };

    const score = Object.keys(formValues.barthel).reduce((total, key) => {
      const value = formValues.barthel[key];
      return total + (barthelPoints[key][value] || 0);
    }, 0);

    let result = 'Dependencia total';
    if (score >= 91) {
      result = 'Independencia total';
    } else if (score >= 61) {
      result = 'Dependencia leve';
    } else if (score >= 21) {
      result = 'Dependencia moderada';
    } else if (score >= 1) {
      result = 'Dependencia severa';
    }

    setBarthelScore(score);
    setBarthelResult(result);
  };

  const handleClearBarthel = () => {
    setFormValues(prev => ({
      ...prev,
      barthel: {
        alimentacion: '',
        bano: '',
        arregloPersonal: '',
        vestido: '',
        defecacion: '',
        controlVesical: '',
        usoInodoro: '',
        traslados: '',
        movilidad: '',
        escaleras: ''
      }
    }));
    setBarthelScore(0);
    setBarthelResult('');
  };

  const handleCalculateDepresion = () => {
    const score = Object.values(formValues.depresion).reduce((total, value) => total + (value === '1' ? 1 : 0), 0);
    let result = 'Depresión improbable';
    if (score >= 10) {
      result = 'Probable presencia de depresión';
    } else if (score >= 6) {
      result = 'Posible depresión';
    }
    setDepresionScore(score);
    setDepresionResult(result);
  };

  const handleClearDepresion = () => {
    setFormValues(prev => ({
      ...prev,
      depresion: {
        pregunta1: '',
        pregunta2: '',
        pregunta3: '',
        pregunta4: '',
        pregunta5: '',
        pregunta6: '',
        pregunta7: '',
        pregunta8: '',
        pregunta9: '',
        pregunta10: '',
        pregunta11: '',
        pregunta12: '',
        pregunta13: '',
        pregunta14: '',
        pregunta15: ''
      }
    }));
    setDepresionScore(0);
    setDepresionResult('');
  };

  return (
    <EvaluationWrapper>
      <Title>Evaluación</Title>
      <DropdownRow>
        <Label>Seleccionar Evaluación:</Label>
        <Dropdown name="evaluacion" value={formValues.evaluacion} onChange={handleChange}>
          <option value="">Seleccione una evaluación</option>
          <option value="mmse">MMSE Mini-Mental State Examination</option>
          <option value="depresion">Escala de depresión geriátrica</option>
          <option value="barthel">Índice de Barthel</option>
        </Dropdown>
      </DropdownRow>
      {formValues.evaluacion === 'mmse' && (
        <>
          <AccordionSection>
            <AccordionTitle onClick={() => toggleSection('orientacion')}>
              Orientación
            </AccordionTitle>
            <AccordionContent isOpen={openSections.orientacion}>
              <p>Verifique la casilla si la respuesta es correcta, dada dentro de 10 segundos</p>
              <CheckboxRow>
                <Label>¿En qué año estamos?</Label>
                <input type="checkbox" name="mmse.orientacion.year" checked={formValues.mmse.orientacion.year} onChange={handleChange} />
              </CheckboxRow>
              <CheckboxRow>
                <Label>¿En qué estación?</Label>
                <input type="checkbox" name="mmse.orientacion.season" checked={formValues.mmse.orientacion.season} onChange={handleChange} />
              </CheckboxRow>
              <CheckboxRow>
                <Label>¿En qué mes y año?</Label>
                <input type="checkbox" name="mmse.orientacion.date" checked={formValues.mmse.orientacion.date} onChange={handleChange} />
              </CheckboxRow>
              <CheckboxRow>
                <Label>¿Qué fecha es hoy?</Label>
                <input type="checkbox" name="mmse.orientacion.day" checked={formValues.mmse.orientacion.day} onChange={handleChange} />
              </CheckboxRow>
              <CheckboxRow>
                <Label>¿Qué día de la semana?</Label>
                <input type="checkbox" name="mmse.orientacion.month" checked={formValues.mmse.orientacion.month} onChange={handleChange} />
              </CheckboxRow>
              <CheckboxRow>
                <Label>¿En qué ciudad estamos?</Label>
                <input type="checkbox" name="mmse.orientacion.city" checked={formValues.mmse.orientacion.city} onChange={handleChange} />
              </CheckboxRow>
              <CheckboxRow>
                <Label>¿En qué país estamos?</Label>
                <input type="checkbox" name="mmse.orientacion.country" checked={formValues.mmse.orientacion.country} onChange={handleChange} />
              </CheckboxRow>
              <CheckboxRow>
                <Label>¿En qué provincia estamos?</Label>
                <input type="checkbox" name="mmse.orientacion.province" checked={formValues.mmse.orientacion.province} onChange={handleChange} />
              </CheckboxRow>
              <CheckboxRow>
                <Label>¿Cuál es el nombre del hospital?</Label>
                <input type="checkbox" name="mmse.orientacion.hospital" checked={formValues.mmse.orientacion.hospital} onChange={handleChange} />
              </CheckboxRow>
              <CheckboxRow>
                <Label>¿En qué planta estamos?</Label>
                <input type="checkbox" name="mmse.orientacion.floor" checked={formValues.mmse.orientacion.floor} onChange={handleChange} />
              </CheckboxRow>
            </AccordionContent>
          </AccordionSection>
          <AccordionSection>
            <AccordionTitle onClick={() => toggleSection('fijacion')}>
              Fijación
            </AccordionTitle>
            <AccordionContent isOpen={openSections.fijacion}>
              <p>Nombre tres palabras, diga al paciente que las repita (puntúe los aciertos) y repítalas para que las memorice.</p>
              <CheckboxRow>
                <Label>Bandera</Label>
                <input type="checkbox" name="mmse.fijacion.flag" checked={formValues.mmse.fijacion.flag} onChange={handleChange} />
              </CheckboxRow>
              <CheckboxRow>
                <Label>Árbol</Label>
                <input type="checkbox" name="mmse.fijacion.tree" checked={formValues.mmse.fijacion.tree} onChange={handleChange} />
              </CheckboxRow>
              <CheckboxRow>
                <Label>Balón</Label>
                <input type="checkbox" name="mmse.fijacion.ball" checked={formValues.mmse.fijacion.ball} onChange={handleChange} />
              </CheckboxRow>
            </AccordionContent>
          </AccordionSection>
          <AccordionSection>
            <AccordionTitle onClick={() => toggleSection('atencion')}>
              Atención
            </AccordionTitle>
            <AccordionContent isOpen={openSections.atencion}>
              <p>Escoja una de las dos: Que deletree la palabra "MUNDO" al revés después de asegurarse de que el paciente puede deletrear normalmente o que reste de 3 en 3 desde 100.</p>
              <CheckboxRow>
                <Label>5 bien ("ODNUM" o 97, 94, 91...)</Label>
                <input type="radio" name="mmse.atencion.spell" value="5" checked={formValues.mmse.atencion.spell === '5'} onChange={handleChange} />
              </CheckboxRow>
              <CheckboxRow>
                <Label>4 bien (ej. ONUM, o 98, 95, 92...)</Label>
                <input type="radio" name="mmse.atencion.spell" value="4" checked={formValues.mmse.atencion.spell === '4'} onChange={handleChange} />
              </CheckboxRow>
              <CheckboxRow>
                <Label>3 bien</Label>
                <input type="radio" name="mmse.atencion.spell" value="3" checked={formValues.mmse.atencion.spell === '3'} onChange={handleChange} />
              </CheckboxRow>
              <CheckboxRow>
                <Label>2 bien</Label>
                <input type="radio" name="mmse.atencion.spell" value="2" checked={formValues.mmse.atencion.spell === '2'} onChange={handleChange} />
              </CheckboxRow>
              <CheckboxRow>
                <Label>1 bien</Label>
                <input type="radio" name="mmse.atencion.spell" value="1" checked={formValues.mmse.atencion.spell === '1'} onChange={handleChange} />
              </CheckboxRow>
              <CheckboxRow>
                <Label>ninguna bien</Label>
                <input type="radio" name="mmse.atencion.spell" value="0" checked={formValues.mmse.atencion.spell === '0'} onChange={handleChange} />
              </CheckboxRow>
            </AccordionContent>
          </AccordionSection>
          <AccordionSection>
            <AccordionTitle onClick={() => toggleSection('recuerdo')}>
              Recuerdo
            </AccordionTitle>
            <AccordionContent isOpen={openSections.recuerdo}>
              <p>Preguntar por las palabras memorizadas.</p>
              <CheckboxRow>
                <Label>Bandera</Label>
                <input type="checkbox" name="mmse.recuerdo.flag" checked={formValues.mmse.recuerdo.flag} onChange={handleChange} />
              </CheckboxRow>
              <CheckboxRow>
                <Label>Árbol</Label>
                <input type="checkbox" name="mmse.recuerdo.tree" checked={formValues.mmse.recuerdo.tree} onChange={handleChange} />
              </CheckboxRow>
              <CheckboxRow>
                <Label>Balón</Label>
                <input type="checkbox" name="mmse.recuerdo.ball" checked={formValues.mmse.recuerdo.ball} onChange={handleChange} />
              </CheckboxRow>
            </AccordionContent>
          </AccordionSection>
          <AccordionSection>
            <AccordionTitle onClick={() => toggleSection('nominacion')}>
              Nominación
            </AccordionTitle>
            <AccordionContent isOpen={openSections.nominacion}>
              <p>Muestre consecutivamente un reloj de pulsera y luego un lápiz. Diga: ¿cómo se llama esto?</p>
              <CheckboxRow>
                <Label>El paciente responde reloj o reloj de pulsera en 10 seg.(no tiempo,hora...) </Label>
                <input type="checkbox" name="mmse.nominacion.watch" checked={formValues.mmse.nominacion.watch} onChange={handleChange} />
              </CheckboxRow>
              <CheckboxRow>
                <Label>Correcto lápiz(no pluma).</Label>
                <input type="checkbox" name="mmse.nominacion.pencil" checked={formValues.mmse.nominacion.pencil} onChange={handleChange} />
              </CheckboxRow>
            </AccordionContent>
          </AccordionSection>
          <AccordionSection>
            <AccordionTitle onClick={() => toggleSection('repeticion')}>
              Repetición
            </AccordionTitle>
            <AccordionContent isOpen={openSections.repeticion}>
              <p>Repita esta frase: "En un trigal había cinco perros"</p>
              <CheckboxRow>
                <Label>Correcta, exacta 10seg</Label>
                <input type="checkbox" name="mmse.repeticion" checked={formValues.mmse.repeticion} onChange={handleChange} />
              </CheckboxRow>
            </AccordionContent>
          </AccordionSection>
          <AccordionSection>
            <AccordionTitle onClick={() => toggleSection('lectura')}>
              Lectura
            </AccordionTitle>
            <AccordionContent isOpen={openSections.lectura}>
              <p>Muestre al paciente un papel con esta orden escrita "CIERRE SUS OJOS"</p>
              <CheckboxRow>
                <Label>El paciente cierra sus ojos</Label>
                <input type="checkbox" name="mmse.lectura" checked={formValues.mmse.lectura} onChange={handleChange} />
              </CheckboxRow>
            </AccordionContent>
          </AccordionSection>
          <AccordionSection>
            <AccordionTitle onClick={() => toggleSection('habilidad')}>
              Habilidad
            </AccordionTitle>
            <AccordionContent isOpen={openSections.habilidad}>
              <p>Dígale al paciente que tome un pedazo de papel con la mano derecha, pliegúelo por la mitad y póngalo en la mesa (dentro de 30 seg.)</p>
              <CheckboxRow>
                <Label>Tome el papel con la mano apropiada</Label>
                <input type="checkbox" name="mmse.habilidad.paper" checked={formValues.mmse.habilidad.paper} onChange={handleChange} />
              </CheckboxRow>
              <CheckboxRow>
                <Label>Lo pliega con ambas manos</Label>
                <input type="checkbox" name="mmse.habilidad.fold" checked={formValues.mmse.habilidad.fold} onChange={handleChange} />
              </CheckboxRow>
              <CheckboxRow>
                <Label>Lo coloca sobre la mesa</Label>
                <input type="checkbox" name="mmse.habilidad.put" checked={formValues.mmse.habilidad.put} onChange={handleChange} />
              </CheckboxRow>
            </AccordionContent>
          </AccordionSection>
          <AccordionSection>
            <AccordionTitle onClick={() => toggleSection('escritura')}>
              Escritura y copia
            </AccordionTitle>
            <AccordionContent isOpen={openSections.escritura}>
              <p>Pídale al paciente que escriba una frase completa en un pedazo de papel (dentro de 30 segundos)</p>
              <CheckboxRow>
                <Label>La frase tiene sentido (Ignorar ortografia)</Label>
                <input type="checkbox" name="mmse.escritura" checked={formValues.mmse.escritura} onChange={handleChange} />
              </CheckboxRow>
              <p>Muestre al paciente y dígale que copie un dibujo de dos pentágonos que interseccionan.</p>
              <CheckboxRow>
                <Label>Dibujo correcto en 30seg.</Label>
                <input type="checkbox" name="mmse.copia" checked={formValues.mmse.copia} onChange={handleChange} />
              </CheckboxRow>
            </AccordionContent>
          </AccordionSection>
          <Button onClick={handleCalculateMmse}>Calcular MMSE</Button>
          <ResultText>Puntuación MMSE: {mmseScore}</ResultText>
          <ResultText>Resultado: {mmseResult}</ResultText>
          <Button onClick={handleClearMmse}>Borrar datos</Button>
        </>
      )}
      {formValues.evaluacion === 'barthel' && (
        <>
          <DropdownRow>
            <Label>Alimentación:</Label>
            <Dropdown name="barthel.alimentacion" value={formValues.barthel.alimentacion} onChange={handleChange}>
              <option value="">Seleccione</option>
              <option value="0">no es posible</option>
              <option value="1">necesita ayuda para cortar, extraer mantequilla o precisa dieta modificada</option>
            </Dropdown>
          </DropdownRow>
          <DropdownRow>
            <Label>Baño:</Label>
            <Dropdown name="barthel.bano" value={formValues.barthel.bano} onChange={handleChange}>
              <option value="">Seleccione</option>
              <option value="0">dependiente</option>
              <option value="1">independiente o puede ducharse</option>
            </Dropdown>
          </DropdownRow>
          <DropdownRow>
            <Label>Arreglo personal:</Label>
            <Dropdown name="barthel.arregloPersonal" value={formValues.barthel.arregloPersonal} onChange={handleChange}>
              <option value="">Seleccione</option>
              <option value="1">necesita ayuda con su cuidado personal</option>
              <option value="0">puede lavarse la cara, peinarse, limpiarse los dientes, afeitarse, etc.</option>
            </Dropdown>
          </DropdownRow>
          <DropdownRow>
            <Label>Vestido:</Label>
            <Dropdown name="barthel.vestido" value={formValues.barthel.vestido} onChange={handleChange}>
              <option value="">Seleccione</option>
              <option value="0">dependiente</option>
              <option value="1">precisa alguna ayuda, pero hace muchas cosas sin ayuda</option>
              <option value="2">independiente, incluyendo botones, cremalleras, cordones, etc.</option>
            </Dropdown>
          </DropdownRow>
          <DropdownRow>
            <Label>Defecación:</Label>
            <Dropdown name="barthel.defecacion" value={formValues.barthel.defecacion} onChange={handleChange}>
              <option value="">Seleccione</option>
              <option value="0">incontinente (o precisa enemas)</option>
              <option value="1">algún problema de inconsistencia ocasional</option>
              <option value="2">continente</option>
            </Dropdown>
          </DropdownRow>
          <DropdownRow>
            <Label>Control vesical:</Label>
            <Dropdown name="barthel.controlVesical" value={formValues.barthel.controlVesical} onChange={handleChange}>
              <option value="">Seleccione</option>
              <option value="0">incontinente, sondado o incapaz de manejar su orina solo</option>
              <option value="1">alguna incontinencia ocasional</option>
              <option value="2">continente</option>
            </Dropdown>
          </DropdownRow>
          <DropdownRow>
            <Label>Uso del inodoro:</Label>
            <Dropdown name="barthel.usoInodoro" value={formValues.barthel.usoInodoro} onChange={handleChange}>
              <option value="">Seleccione</option>
              <option value="0">dependiente</option>
              <option value="1">precisa alguna ayuda, pero hace casi todo solo</option>
              <option value="2">independiente, para sentarse, levantarse, limpiarse y vestirse</option>
            </Dropdown>
          </DropdownRow>
          <DropdownRow>
            <Label>Traslados:</Label>
            <Dropdown name="barthel.traslados" value={formValues.barthel.traslados} onChange={handleChange}>
              <option value="">Seleccione</option>
              <option value="0">incapaz de mantenerse sentado</option>
              <option value="1">precisa bastante ayuda (una o dos personas), pero puede permanecer sentado</option>
              <option value="2">ayuda mínima, física o verbal</option>
              <option value="3">independiente</option>
            </Dropdown>
          </DropdownRow>
          <DropdownRow>
            <Label>Movilidad en superficies planas:</Label>
            <Dropdown name="barthel.movilidad" value={formValues.barthel.movilidad} onChange={handleChange}>
              <option value="">Seleccione</option>
              <option value="0">inmóvil o menos de 45 metros desplazado</option>
              <option value="1">independiente en silla de ruedas (incluyendo rincones), más de 45 metros</option>
              <option value="2">camina con ayuda de una persona (verbal o física) más de 45 metros</option>
              <option value="3">independiente (aunque precisa bastón o muleta) más de 45 metros</option>
            </Dropdown>
          </DropdownRow>
          <DropdownRow>
            <Label>Escaleras:</Label>
            <Dropdown name="barthel.escaleras" value={formValues.barthel.escaleras} onChange={handleChange}>
              <option value="">Seleccione</option>
              <option value="0">imposible</option>
              <option value="1">precisa alguna ayuda, verbal o física</option>
              <option value="2">independiente</option>
            </Dropdown>
          </DropdownRow>
          <Button onClick={handleCalculateBarthel}>Calcular Índice de Barthel</Button>
          <ResultText>Puntuación BARTHEL: {barthelScore}</ResultText>
          <ResultText>Valoración de la dependencia: {barthelResult}</ResultText>
          <Button onClick={handleClearBarthel}>Borrar datos</Button>
        </>
      )}
      {formValues.evaluacion === 'depresion' && (
        <>
          <CheckboxRow>
            <Label>¿Está básicamente satisfecho con su vida?</Label>
            <div>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta1" value="0" checked={formValues.depresion.pregunta1 === '0'} onChange={handleChange} />
                Sí (0 puntos)
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta1" value="1" checked={formValues.depresion.pregunta1 === '1'} onChange={handleChange} />
                No (1 punto)
              </CheckboxLabel>
            </div>
          </CheckboxRow>
          <CheckboxRow>
            <Label>¿Ha abandonado muchos de sus intereses y actividades?</Label>
            <div>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta2" value="1" checked={formValues.depresion.pregunta2 === '1'} onChange={handleChange} />
                Sí (1 punto)
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta2" value="0" checked={formValues.depresion.pregunta2 === '0'} onChange={handleChange} />
                No (0 puntos)
              </CheckboxLabel>
            </div>
          </CheckboxRow>
          <CheckboxRow>
            <Label>¿Siente que su vida está vacía?</Label>
            <div>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta3" value="1" checked={formValues.depresion.pregunta3 === '1'} onChange={handleChange} />
                Sí (1 punto)
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta3" value="0" checked={formValues.depresion.pregunta3 === '0'} onChange={handleChange} />
                No (0 puntos)
              </CheckboxLabel>
            </div>
          </CheckboxRow>
          <CheckboxRow>
            <Label>¿Se aburre a menudo?</Label>
            <div>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta4" value="1" checked={formValues.depresion.pregunta4 === '1'} onChange={handleChange} />
                Sí (1 punto)
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta4" value="0" checked={formValues.depresion.pregunta4 === '0'} onChange={handleChange} />
                No (0 puntos)
              </CheckboxLabel>
            </div>
          </CheckboxRow>
          <CheckboxRow>
            <Label>¿Está de buen humor la mayor parte del tiempo?</Label>
            <div>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta5" value="0" checked={formValues.depresion.pregunta5 === '0'} onChange={handleChange} />
                Sí (0 puntos)
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta5" value="1" checked={formValues.depresion.pregunta5 === '1'} onChange={handleChange} />
                No (1 punto)
              </CheckboxLabel>
            </div>
          </CheckboxRow>
          <CheckboxRow>
            <Label>¿Tiene miedo a que le vaya a pasar algo malo?</Label>
            <div>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta6" value="1" checked={formValues.depresion.pregunta6 === '1'} onChange={handleChange} />
                Sí (1 punto)
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta6" value="0" checked={formValues.depresion.pregunta6 === '0'} onChange={handleChange} />
                No (0 puntos)
              </CheckboxLabel>
            </div>
          </CheckboxRow>
          <CheckboxRow>
            <Label>¿Se siente feliz la mayor parte del tiempo?</Label>
            <div>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta7" value="0" checked={formValues.depresion.pregunta7 === '0'} onChange={handleChange} />
                Sí (0 puntos)
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta7" value="1" checked={formValues.depresion.pregunta7 === '1'} onChange={handleChange} />
                No (1 punto)
              </CheckboxLabel>
            </div>
          </CheckboxRow>
          <CheckboxRow>
            <Label>¿Se siente a menudo impotente?</Label>
            <div>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta8" value="1" checked={formValues.depresion.pregunta8 === '1'} onChange={handleChange} />
                Sí (1 punto)
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta8" value="0" checked={formValues.depresion.pregunta8 === '0'} onChange={handleChange} />
                No (0 puntos)
              </CheckboxLabel>
            </div>
          </CheckboxRow>
          <CheckboxRow>
            <Label>¿Prefiere quedarse en casa en lugar de salir y hacer cosas nuevas?</Label>
            <div>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta9" value="1" checked={formValues.depresion.pregunta9 === '1'} onChange={handleChange} />
                Sí (1 punto)
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta9" value="0" checked={formValues.depresion.pregunta9 === '0'} onChange={handleChange} />
                No (0 puntos)
              </CheckboxLabel>
            </div>
          </CheckboxRow>
          <CheckboxRow>
            <Label>¿Siente que tiene más problemas de memoria que la mayoría?</Label>
            <div>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta10" value="1" checked={formValues.depresion.pregunta10 === '1'} onChange={handleChange} />
                Sí (1 punto)
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta10" value="0" checked={formValues.depresion.pregunta10 === '0'} onChange={handleChange} />
                No (0 puntos)
              </CheckboxLabel>
            </div>
          </CheckboxRow>
          <CheckboxRow>
            <Label>¿Cree que es maravilloso estar vivo ahora?</Label>
            <div>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta11" value="0" checked={formValues.depresion.pregunta11 === '0'} onChange={handleChange} />
                Sí (0 puntos)
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta11" value="1" checked={formValues.depresion.pregunta11 === '1'} onChange={handleChange} />
                No (1 punto)
              </CheckboxLabel>
            </div>
          </CheckboxRow>
          <CheckboxRow>
            <Label>¿Se siente bastante inútil tal y como está ahora?</Label>
            <div>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta12" value="1" checked={formValues.depresion.pregunta12 === '1'} onChange={handleChange} />
                Sí (1 punto)
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta12" value="0" checked={formValues.depresion.pregunta12 === '0'} onChange={handleChange} />
                No (0 puntos)
              </CheckboxLabel>
            </div>
          </CheckboxRow>
          <CheckboxRow>
            <Label>¿Se siente lleno de energía?</Label>
            <div>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta13" value="0" checked={formValues.depresion.pregunta13 === '0'} onChange={handleChange} />
                Sí (0 puntos)
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta13" value="1" checked={formValues.depresion.pregunta13 === '1'} onChange={handleChange} />
                No (1 punto)
              </CheckboxLabel>
            </div>
          </CheckboxRow>
          <CheckboxRow>
            <Label>¿Siente que su situación es desesperanzadora?</Label>
            <div>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta14" value="1" checked={formValues.depresion.pregunta14 === '1'} onChange={handleChange} />
                Sí (1 punto)
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta14" value="0" checked={formValues.depresion.pregunta14 === '0'} onChange={handleChange} />
                No (0 puntos)
              </CheckboxLabel>
            </div>
          </CheckboxRow>
          <CheckboxRow>
            <Label>¿Cree que la mayoría de la gente está mejor que usted?</Label>
            <div>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta15" value="1" checked={formValues.depresion.pregunta15 === '1'} onChange={handleChange} />
                Sí (1 punto)
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="radio" name="depresion.pregunta15" value="0" checked={formValues.depresion.pregunta15 === '0'} onChange={handleChange} />
                No (0 puntos)
              </CheckboxLabel>
            </div>
          </CheckboxRow>
          <Button onClick={handleCalculateDepresion}>Calcular Escala de Depresión</Button>
          <ResultText>Recuento total de puntos de criterios: {depresionScore}</ResultText>
          <ResultText>{depresionResult}</ResultText>
          <Table>
            <thead>
              <tr>
                <th>Puntos</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10 - 15</td>
                <td>Probable presencia de depresión</td>
              </tr>
              <tr>
                <td>6 - 9</td>
                <td>Posible depresión</td>
              </tr>
              <tr>
                <td>0 - 5</td>
                <td>Depresión improbable</td>
              </tr>
            </tbody>
          </Table>
          <Button onClick={handleClearDepresion}>Borrar datos</Button>
        </>
      )}
    </EvaluationWrapper>
  );
};

export default Evaluacion;
